const { alert } = require("../lib/common");

/** 회원전용 페이지 미들웨어 */
module.exports.memberOnly = (req,res,next)=>{
	if(!req.isLogin){
		res.status(401);//권한 없음
		return alert("회원 전용 페이지입니다.", res, -1);
	}
	next();
};

/** 비회원전용 페이지 미들웨어 */
module.exports.guestOnly = (req,res,next)=>{
	if(req.isLogin){
		res.status(401);//권한 없음
		return alert("로그인한 회원은 접근 불가한 페이지입니다.", res, -1);
	}
	next();
};

/** 관리자전용 페이지 미들웨어 */
module.exports.adminOnly = (req,res,next)=>{
	if(!req.isLogin || req.member.isAdmin){
		res.status(401);//권한 없음
		return alert("페이지 접근 권한이 없습니다.", res, -1);
	}	
	next();
};