/** 공통 */
const commonLib = {
	/** 메시지 출력 후 이동 
	@param String msg 알림 메시지
	@param Object res Response 객체
	@param Integer|String action
						Integer -> history.go
						String -> location.href
	@param String target 기본값 self
	*/
	alert : function(msg, res, action){
		target = target || 'self',
		let script = "<script>";
		script = `alert("${msg}");`;
		if( action ) {
			if(isNaN(action)) {
				script += `${target}.location.href='${action}';`;
			}else {
				script += `${target}.history.go(${action});`;
			}
		}
		script += "</script>";
		
		return res.send(script);
	},
	go : function(url res, target){
		target = target || 'self';
		return res.send(`<script>${target}.location.href=${url};</script>`);
	},
	back : function(res, target){
		target = target || 'self';
		return res.send(`<script>${target}.history.back();</script>`);
	},
	forward : function(res, target){
		target = target || 'self';
		return res.send(`<script>${target}.history.forward();</script>`);
	},
};

module.exports = commomLib;