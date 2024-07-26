var express = require('express');
var router = express.Router();

//공통 기능 미들웨어 참조하기
//middleware.js모듈에서 checkParams,checkQuery함수 참조하기
const{checkParams,checkQuery} = require('./middleware.js');

//해당 라우터 파일이 호출되면 무조건 실행되는 미들웨어 함수 정의하기
router.use(function(req,res,next){
  console.log("index.js 라우터 파일이 호출될때마다 실행되는 기능 구현하기");
  next();
  //res.send("모든 응답 반환하기")
});

//특정 주소 호출에 대한 미들웨어 기능 추가
//http://localhost:3000/sample
router.use('sample',function(req,res,next){
  console.log('Index.js 라우터 파일 미들웨어 2호출', req.origianlUrl);
},function(req,res,next){
  console.log('Index.js 라우터 파일 미들웨어3호출',req.method);
  res.send(req.method);
});

/* 메인 웹페이지 요청과 응답처리 라우팅 메소드 
- 호출주소: http://localhost:3000/
- 호출방식: GET
-응답결과: views.index.ejs 뷰파일 웹페이지 내용 응답 결과로 제공
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//http:localhost:3000/test/1
//checkParams미들웨어 요청이후 먼저 실행하게 하여 특정로직을 태웁니다.
//Step1:router.get메도드 실행 -> checkParams미들웨어 함수 실행 -> 응답 콜백함수 실행
router.get('/test/:id',async(reqq,res,next)=>{
  res.render('index.ejs',{title:"테스트"});

  });


//http:localhost:3000/product?category=computer
router.get('/test/:id',async(req,res,next)=>{
  
});


module.exports = router;
