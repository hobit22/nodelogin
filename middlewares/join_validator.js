const logger = require("../lib/logger");

module.exports.joinValidator = function(req,res,next) {
	console.log(req.body);
	next();
};