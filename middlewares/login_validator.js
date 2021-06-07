const { alert } = require("../lib/common");
module.exports.loginValidator = (req,res,next)=>{
	if(!req.body.memId){
		return alert("아이디를 입력하세요", res);
	}
	if(!req.body.memPw){
		return alert("비밀번호를 입력하세요", res);
	}
	next();
};