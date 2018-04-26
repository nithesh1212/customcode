var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var request = require('request-promise');
var finicity = require('./finicity');
var xml2json = require ('xml2json');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static',express.static(path.join(__dirname, 'public')));

app.post('/fromKore',function(req,res){
	//useToken();
	//res.writeHead(200,{'Content-Type':'application/json'});
	console.log('%%%%%%%%%%%%%%',req.query.url);
	console.log('$$$$$$$$$$$$$$$',req.query.type);
	console.log('12',req.query.fromdate);
  console.log('123',req.query.todate);
  console.log('cttype',req.headers);
  console.log('req')
  var koreheaders = { };

  if(typeof(req.headers['content-type']) === 'undefined'){
    koreheaders['content-type'] = 'application/xml';
  } else {
    koreheaders['content-type'] = req.headers['content-type'];
  }
  var korequeryparams = {
     type : req.query.type,
     url: req.query.url,
     fromdate : req.query.fromdate,
     todate : req.query.todate,
     payload : req.body
  }
  console.log('12344',korequeryparams);
  console.log('333333',koreheaders);
  finicity.getOptions(korequeryparams, koreheaders).then(function(options){
	  var isParsedResponse=false;
  if(options['methodname'] !== 'GET'){
	  isParsedResponse =true;
  }
	
	
	console.log('>>>>>');
    console.log(options);
    res.setHeader('content-type' ,koreheaders['content-type']);
        finicity.finicity(options).then(function(response){

          var isValidToken = false;
          console.log(koreheaders['content-type']);

         if(koreheaders['content-type'] == 'application/xml'){

           var xmlDoc = response;
            var data = JSON.parse(xml2json.toJson(xmlDoc));
            console.log('WWWW');
            console.log(data);
            console.log(data.error);
            if (typeof(data.error) === 'undefined' || typeof(data.error.code) === 'undefined'){
              isValidToken = true;
            } else {
              if (data.error.code !== 'undefined' && (data.error.code === '10023' || data.error.code === '10022' || data.error.code === '10024')) {
                  isValidToken = false;
                }
              } 
         } else {
			 console.log('........', response);

          var data = response;
        //  var str = data.toString();
		console.log(data);

          //console.log('>>>>>',str);
            if(typeof(data.code) !== 'undefined' && (data.code === 10023 || data.code === 10022 || data.code === 10024)){
              //console.log('>>>>>>>>>>>>>>>>>>>>>',str);
              isValidToken = false;
            } else {
              isValidToken = true;
            }
         }
         if(!isParsedResponse){ 
         var data = JSON.parse(response);
		 }else{
			 var data = response;
		 }
          if(!isValidToken){
            finicity.token().then(function(tokenresponse){
             console.log('>>>UU');
              console.log(tokenresponse);
              global.accessToken = tokenresponse.token;
              options.headers['Finicity-App-Token'] = global.accessToken;
              finicity.finicity(options).then(function(response2){
                res.send(response2);
              });
            });
           } else {
              res.send(response);
              console.log('>>>>>>>>>>>>>>>>>>>>>',response);
           } 
        }); 

     });
    
});

app.get('/',function(req,res){
	res.end('Welcome to API');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
