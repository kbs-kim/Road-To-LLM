//npm start --> bin/www.js실행(웹서버/서비스 환경구성) --> app.js --> routing 모듈 호출 --> 라우팅메소드 호출
//--> DATA(Mode1) 또는 VIEW파일 호출 반환

//에러처리를 위한 객체 잠조: 별로 안중요..

var createError = require('http-errors');

//node express 웹 어플리케이션 객체 생성
var express = require('express');

//서버상의 물리적 경로관리 내장 모듈
var path = require('path');

//쿠키정보를 파싱해주는 객체 참조
var cookieParser = require('cookie-parser');

//서버측에서 전문 로깅처리를 mornan로거 참조 : 잘 안씀
var logger = require('morgan');

//가장 중요: 각종 사용자 요청과 응답을 처리해주는 라우터(라우팅파일) 참조하기
//라우터 파일별로 라우터 객체 참조

//전체 공통 라우터 파일
var indexRouter = require('./routes/index');

//샘플 라우터 파일로 사용자 정보(웹페이지) 요청과 응답에서 샘플제공
var usersRouter = require('./routes/users');

//express메소드를 호출해 nodeapp 객체를 생성한다.
var app = express();

//생성된 노드 백엔드 앱에 각종 설정들을 set메소드를 통해 설정한다.
// view engine setup
//__dirname : 현재 실행중인 node.js파일의 물리적 경로를 반환한다.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use()메소드를 통해 특정 기능 사용을 추가한다.
//노드 앱에 logger기능 추가
app.use(logger('dev'));

//노드앱에 json반환 기능추가
app.use(express.json());

//기타 추가기능정의
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//상단에서 참조한 라우터 파일들의 기본 호출주소체계정의
//routes/index.js 라우터 파일을 http://localhost:3000/ 기본주소로 설정
app.use('/', indexRouter);

//routes/users.js 라우터 파일의 기본 호출 주소 체계를 정의한다.
//http://localhost:3000/users
app.use('/users', usersRouter);

// catch 404 and forward to error handler
//404에러처리를 위한 미들웨어 메소드
//200: 서버요청에 정상응답, 400: 서버에 요청했지만 서버에 요청리소스가 없는 경우
//500: 서버요청했는지 서버에서 처리하다가 서버에러 발생코드 반환
app.use(function(req, res, next) {
  //각종 비정상적인 요청에 대한 404웹페이지 반환처리 기능제공
  next(createError(404));
});

// error handler
//500서버츨 에러에 대한 저역 예외 처리기
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.js 모둘내의 app객체를 반환한다.
module.exports = app;
