var express = require('express');
var router = express.Router();
var Store = require("jfs");
var db = new Store("data",{pretty:true});





	router.post('/', function(req, res, next) {
	var payload = req.body
	var obj = db.getSync("book-a-flight");
	console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( var i=0; i < 4; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

	var result;
	  obj.flight.map(function(flight){
		  console.log(flight);
    
				flight.Id = payload.flightid;
    			flight.bookingId = 'KL'+text;
    			
				flight.passengername = payload.name;
				
    		    result = flight;
    
    	});
      
	  res.send(result);
});
	

	
	
	
module.exports = router;
