const member = require("../models/member");

/** 로그인 세션 처리 */

module.exports.loginSession = async (req,res,next) => {
	req.isLogin = res.isLogin = res.locals.isLogin = false;
	if( req.session.memId) { //로그인이 된 경우
		const info = await member.get(req.session.memId);
		delete info.memPw;
		if(info) {
			req.isLogin = res.isLogin = res.locals.isLogin = true;
			req.member = res.member = res.locals.member = info;
		}
	} // endif
	next();
};