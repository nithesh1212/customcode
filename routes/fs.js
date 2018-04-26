var express = require('express');
var router = express.Router();
var Store = require("jfs");
var db = new Store("data",{pretty:true});



router.get('/', function(req, res, next) {
	
	var source = req.query.source;
	var dest = req.query.dest;
	var date = req.query.date
	//var returndate = req.query.returndate;
	var obj = db.getSync("book-a-flight");
	var result = {
        "flight":[]
    };		
    	obj.flight.map(function(flight){
    		if(flight.itacode_departure === source && flight.itacode_arrival 	=== dest ){
    			//flight.type = "going";
    			result.flight.push(flight);
    		} /*else if(flight.date === date && flight.departureairport.code === to && flight.arrivalairport.code === from){
               flight.type = "return";
               result.flights.push(flight);
    		}*/
    	});
    res.send(result);
    	
});

	
	
module.exports = router;
