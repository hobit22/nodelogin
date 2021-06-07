const { alert } = require("../lib/common");
/** 회원전용 페이지 미들웨어 */

module.exports.memberOnly = (req,res,next)=>{
	if(!req.isLogin){
		return alert("회원 전용 페이지입니다.", res, -1);
	}
	next();
};

module.exports.guestOnly = (req,res,next)=>{
	if(req.isLogin){
		return alert("로그인한 회원은 접근 불가한 페이지입니다.", res, -1);
	}
	next();
};