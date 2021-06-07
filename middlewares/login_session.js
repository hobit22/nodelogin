/** 로그인 세션 처리 */

module.exports.loginSession = async (req,res,next) => {
	console.log(req.session);
	next();
};