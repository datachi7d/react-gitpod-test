var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

var app = express();

app.use(logger('dev'));
app.use(jsonParser);


//TODO: sort this out
// app.use(cors({
//     origin: "https://3000-f5ccb2ef-5cb7-4342-812f-4cd50c62621b.ws-us03.gitpod.io"
// }));


app.options("/submit", cors())
app.post('/submit', jsonParser, function(req, res) {
    console.log("request: " + JSON.stringify(req.body));
    res.json({message: 'message here'});
    res.status(200);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log("ERROR:  " + JSON.stringify(err))
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
