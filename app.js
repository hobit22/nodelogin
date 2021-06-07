const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const logger = require('./lib/logger');
const { sequelize } = require("./models");

dotenv.config();

const app = express();

app.set('port', process.env.PORT || '3000');
app.set("view engine", "html");
nunjucks.configure('views' , {
	express : app,
	watch : true,
});

sequelize.sync({ force : false })
	.then(() => {
		logger("db 연결 성공");
	})
	.catch((err)=> {
		logger(err.message, "error");
		logger(err.stack, "error");
	});


if(process.env.NODE_ENV == 'production'){
	app.use(morgan("combined"));
}else {
	app.use(morgan("dev"));	
}
app.use(methodOverride('_method'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => { //없는 페이지 미들웨어
	const error = new Error(`${req.method} ${req.url} 는 없는 페이지 입니다.`);
	error.status = 404;
	next(error);
});

app.use((err,req,res,next)=> { // 오류 처리 미들웨어
	err.status = err.status || 500;
	logger("[" + err.status + "]" + err.message, 'error');
	logger(err.stack, 'error');
	
	if(process.env.NODE_ENV == 'production' ) err.stack ="";
	
	res.locals.error = err;
});

app.listen(app.get('port'),() =>{
	console.log(app.get('port'), '번 포트에서 대기중');
});
