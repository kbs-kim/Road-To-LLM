//노드 기본 백엔드 앱의 기본 공통적인 사용자 요청과 응답처리 전용 라우터 파일
//해당 라우터 파일의 기본 호출주소 : http://localhost:3000/
//모든 라우터 파일을 기본 호출주소 체계를 app.js에서 사전 정의한다.

//express 객체 참조하기
var express = require('express');



//각종 사용자 요청과 응답을 처리할 수 있는 router객체를 express.Router()메소드를 통해 생성한다.
//생성된 router객체를 통해 각종 사용자 요청과 응답을 요청한다.
var router = express.Router();

/*
 메인페이지 요청과 응답처리 라우팅 메소드.
호출주소: http://localhost:3000/
 */
router.get('/', function(req, res, next) {
  //서버에서 사용자 웹브라우저로 응답결과물을 반환합니다.
  //지정된 뷰 파일내 웹페이지가 반환됩니다.
  //res.render('뷰파일경로',뷰파일에 전달하는 JSON데이터);
  res.render('index.ejs', { title: '홈페이지' });
});


//회원가입 웹페이지 요청과 응답처리 라우팅 메소드 구현하기
//router.get('호출주소체계url',콜백함수);
//콜백함수는 해당 라우팅메소드가 호출되면 서버에서 응답처리하기 위한 함수가 자동실행.
//호출주소: http://localhost:3000/entry
//콜백함수가 서버에서 응답 처리해야하는 기능을 구현하는 영역
router.get('/entry',function(req,res){

  console.log("http://localhost:3000/라우팅메소드의 콜백함수가 호출되었습니다.");

  console.log("사용자 클라이언트 정보를 req(HttpRequest객체에서 조회가능합니다.",req);

  //테스트 쿼리스트리밍 아이디값을 추출합니다.
  //http://localhost:3000/?id=testing&stock=2
  const testId= req.query.id;
  const stock = req.query.stock;

  console.log("URL쿼리스트링 방식으로 전달된 데이터 출력:", testId, stock);
  console.log("서버측에서 웹브라우저를 응답처리를 위한 res(httpResponse객체)정보:",res);  
  console.log("res.render()메소드를 통해 메인 뷰파일 (index.ejs)파일이 바로 호출됩니다.")

  
  //res.redner()메소드는 서버에서 지정한 뷰파일을 웹브라우저로 전달하는 메소드
  //res.render('뷰파일경로',뷰파일에 전달할 JSON데이터);
  res.render('entry.ejs');

});

//로그링 웹페이지 요청과 응답처리 라우팅 메소드 구현하기
//호출주소체계: localhost:3000/login
router.get('/login',function(req,res){
  //서버에서 응답처리할 기능 구현
  //views폴더내 login.ejs파일내 html웹페이지를 웹브라우저에 전달한다.
  res.render('login.ejs')



});






module.exports = router;
