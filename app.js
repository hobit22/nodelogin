const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const logger = require('./lib/logger');
const { sequelize } = require("./models");
const { mainMenu } = require("./middlewares/main_menu"); //메인 메뉴
const { loginSession } = require("./middlewares/login_session"); //로그인 세션 처리 


/** 라우터 */
const indexRouter = require('./routes/index'); //index생략가능 메인페이지
const memberRouter = require('./routes/member'); //회원 페이지

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

app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키파서 미들웨어

//세션 기본 설정
app.use(session({
	resave : false,
	saveUninitialized : true,
	secret : process.env.COOKIE_SECRET,
	cookie : {
		httpOnly : true,
		secure : false, 
	},
	name : 'hbtest',
}));


app.use(methodOverride('_method'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(loginSession);// 로그인 세션 처리 
app.use(mainMenu); //메인메뉴


/** 공통 라우터 */
app.use((req, res, next) => {
	/* body 클래스 자동 완성(url 기준) */
	let url = req.url;
	let end = url.indexOf("?");
	if (end !== -1) {
		url = url.slice(0,end);
	}
	end = url.indexOf("#");
	if (end !== -1) {
		url = url.slice(0,end);
	}
	
	let addClass = "";
	if (url == '/') addClass = "main";
	else {
		url = url.split("/");
		if (url.length > 2) {
			addClass = url[1] + "_" + url[2];
		} else {
			addClass = url[1];
		}
	}
	
	res.locals.bodyClass = addClass;
	
	next();
});

/** 라우터 등록 */
app.use('/', indexRouter);
app.use('/member', memberRouter);

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
	res.status(err.status).render('error'); //에러 페이지 출력
});

app.listen(app.get('port'),() =>{
	console.log(app.get('port'), '번 포트에서 대기중');
});	
