var express = require('express');
var router = express.Router();
var Store = require("jfs");
var db = new Store("data",{pretty:true});


router.get('/', function(req, res, next) {
	var obj = db.getSync("flight");
    //var query = req.params.query;
    //query = query.toLowerCase();
    var result = {
        "flight":[]
    };
    	obj.flight.map(function(flight){
    		//if(airport.name.toLowerCase().indexOf(query)> -1 || airport.city.toLowerCase().indexOf(query)>-1 || airport.countryname.toLowerCase().indexOf(query)>-1){
    		    result.flight.push(flight);
    		//}
    	});
    res.send(result);
});

router.get('/search', function(req, res, next) {
	
	var source = req.query.source;
	var dest = req.query.dest;
	var date = req.query.date
	//var returndate = req.query.returndate;
	var obj = db.getSync("book-a-flight");
	var result = {
        "flight":[]
    };		
    	obj.flights.map(function(flight){
    		if(flight.itacode_departure.code === source && flight.itacode_arrival.code === departure && departure_date === date){
    			//flight.type = "going";
    			result.flights.push(flight);
    		} /*else if(flight.date === date && flight.departureairport.code === to && flight.arrivalairport.code === from){
               flight.type = "return";
               result.flights.push(flight);
    		}*/
    	});
    res.send(result);
    	
});

	
	
module.exports = router;
