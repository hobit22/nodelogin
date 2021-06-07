const express= require("express");
const router= express.Router();

router.get('/', (req,res,next) =>{
	const data = {
		addCss : ['test1' , 'test2'],
		addScript : ['test1', 'test2'],
	};
	res.render("main/index");
});

module.exports = router;