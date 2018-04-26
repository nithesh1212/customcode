var express = require('express');
var router = express.Router();
var Store = require("jfs");
var db = new Store("data",{pretty:true});

/* GET users listing. */
router.get('/', function(req, res, next) {
	var obj = db.getSync("mealstype");
    //var query = req.params.query;
    //query = query.toLowerCase();
    var result = {
        "meals_type":[]
    };
    	obj.meals_type.map(function(meals_type){
    		//if(airport.name.toLowerCase().indexOf(query)> -1 || airport.city.toLowerCase().indexOf(query)>-1 || airport.countryname.toLowerCase().indexOf(query)>-1){
    		    result.meals_type.push(meals_type);
    		//}
    	});
    res.send(result);
});

module.exports = router;
