var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//새로 추가한 코드
var adminRouter = require('./routes/admin'); // admin.js 파일을 가져옵니다.***
//var memberRouter = require('./routes/member'); // member.js 파일을 가져옵니다.***
//var channelRouter = require('./routes/channel'); // channel.js 파일을 가져옵니다.***
var articleRouter = require('./routes/article'); // article.js 파일을 가져옵니다.***
//var messageRouter = require('./routes/message'); // message.js 파일을 가져옵니다.***


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);  // '/' 경로로 들어오는 요청은 indexRouter로 라우팅합니다.***기본
app.use('/users', usersRouter);

//새로 추가한 코드
app.use('/admin', adminRouter); // '/admin' 경로로 들어오는 요청은 adminRouter로 라우팅합니다. ***
//app.use('/member', memberRouter); // '/member' 경로로 들어오는 요청은 memberRouter로 라우팅합니다.***
//app.use('/channel', channelRouter); // '/channel' 경로로 들어오는 요청은 channelRouter로 라우팅합니다.***
app.use('/article', articleRouter); // '/article' 경로로 들어오는 요청은 articleRouter로 라우팅합니다. *** 
//app.use('/message', messageRouter); // '/message' 경로로 들어오는 요청은 messageRouter로 라우팅합니다.***

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
