const querystring = require('querystring');

/**
	네이버 로그인
*/
const naverLogin = {
	clinetId : "wzpDSUsP6zWnakA4rHpm",
	secret : "BE5bfGpOfw",
	redirectUri : '',
	
	/**
	code 발급 요청 url
	*/
	getCodeUrl : function(){
		const params ={
			response_type : 'code',
			client_id : this.clientId,
			redirect_uri : this.redirectUri,
			state: new Date().getTime(),
		};
		
		const url = "http://nid.naver.com/~~~~" + querystring.stringify(params);
		return url;
		
	},
};

module.exports = naverLogin;