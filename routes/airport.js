var express = require('express');
var router = express.Router();
var Store = require("jfs");
var rp = require('request-promise');

/* GET users listing. */
router.get('/', function(req, res, next) {
	
	
	var msgId = req.query.msgId;
	
	
	
var options = {
		method: 'GET',
		uri: 'https://api.ciscospark.com/v1/messages/'+msgId,
		headers: {
				
				'Authorization' : 'Bearer N2U3MDhmMDQtNTFmOC00MmU1LWJjMjItZTQzMzczOWI5NDQwMjkzMjFlNGItODhi',
				'content-type' : 'application/json'
		},
		
		json: true // Automatically stringifies the body to JSON
	};
	

 
	rp(options)
    .then(function (parsedBody) {
       res.send(parsedBody);
    })
    .catch(function (err) {
	  res.send(err);
	 
    });
	

});

module.exports = router;
