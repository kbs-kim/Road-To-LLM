var express = require('express'); // Express 모듈을 가져옵니다.
var router = express.Router(); // 새로운 라우터 객체를 생성합니다.



/* 임시메인 페이지 요청과 응답처리 라우팅 메소드 */
router.get('/', function(req, res, next) { 
// 루트 경로 ('/')에 대한 GET 요청을 처리하는 라우팅 메소드입니다.
//function(req, res, next): 요청을 처리하기 위한 콜백 함수입니다. 여기서 req는 요청 객체, 
//res는 응답 객체, next는 다음 미들웨어 함수를 호출하기 위한 함수입니다.
  
  res.render('index', { title: 'Express' });
});
//res.render('index', { title: 'Express' }): 'index' 템플릿 파일을 렌더링하고, 
//{ title: 'Express' } 객체를 템플릿에 전달하여 title이라는 변수로 사용할 수 있도록 합니다. 
//'index' 템플릿 파일은 일반적으로 views 디렉토리에 위치하며, 뷰 엔진에 따라 확장자 (.ejs, .pug, .hbs 등)가 다를 수 있습니다.
//여기서는 .ejs 확장자를 사용하는 템플릿 파일을 사용하고 있습니다.


/* 
- 관리자 웹사이트 로그인 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/login
- 요청방식: Get
- 응답결과: login.ejs 뷰페이지 반환
*/
router.get('/login', function(req, res, next) { // '/login' 경로에 대한 GET 요청을 처리하는 라우팅 메소드입니다.
res.render('login.ejs',{resultMsg:''}); // -> login.ejs파일을 생성해야한다.
// 'login.ejs' 템플릿 파일을 렌더링하고, {resultMsg:''} 객체를 템플릿에 전달하여 resultMsg라는 변수로 사용할 수 있도록 합니다.
// 여기서 resultMsg는 뷰 페이지에서 사용할 수 있는 빈 문자열 메시지입니다. 'login.ejs' 템플릿 파일은 일반적으로 views 디렉토리에 위치합니다.
});


/* 
- 관리자 로그인 정보처리 요청과 응답 라우팅메소드
- 요청주소: http://localhost:5001/login
- 요청방식: Post
- 응답결과: /main 페이지로 이동시킴
*/

// '/login' 경로에 대한 POST 요청을 처리하는 라우팅 메소드입니다.
router.post('/login', function(req, res, next) { 
  
  // POST 요청의 본문에서 userid 값을 가져옵니다.
  const userid = req.body.userid;
  // POST 요청의 본문에서 password 값을 가져옵니다.
  const password = req.body.password;

  //id/password 체크후 결과확인
  const result = false;

  if(result){
      //정상 로그인시 
      res.redirect('/main');
  }else{
      //아이디 또는 암호가 틀리면 다시 로그인페이지 반환
      // 'login.ejs' 템플릿을 렌더링하고 실패 메시지를 전달합니다.
      res.render('login.ejs',{resultMsg:'로그인 실패'});
  }

});


/* 
- 관리자 웹사이트 메인 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/main
- 요청방식: Get
- 응답결과: main.ejs 뷰페이지 반환
*/
router.get('/main', function(req, res, next) {
  res.render('main.ejs');
});





module.exports = router; // 이 모듈에서 정의한 router 객체를 내보냅니다.
