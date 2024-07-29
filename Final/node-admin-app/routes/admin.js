var express = require('express');
var router = express.Router();

/* 
- 관리자계정목록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/list
- 요청방식: Get
- 응답결과: admin/list.ejs 뷰페이지 반환
*/
router.get('/list', function(req, res, next) {
    res.render('admin/list');
});

/* 
- 관리자계정 신규등록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/create
- 요청방식: Get
- 응답결과: admin/create.ejs 뷰페이지 반환
*/
router.get('/create', function(req, res, next) {
    res.render('admin/create');
});

/* 
- 관리자계정 신규등록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/create
- 요청방식: post
- 응답결과: 목록페이지 이동
*/
router.post('/create', function(req, res, next) {
    //기능구현
    res.redirect('/admin/list');
});





//http://localhost:5001/admin/modify
router.post('/modify',function(req,res,next){
    const id = req.body.id; //req.body.id는 name이 id인 input태그의 값을 가져온다.
    const pwd = req.body.pw; //req.body.pw는 name이 pw인 input태그의 값을 가져온다.
    const code = req.body.code; //req.body.code는 name이 code인 input태그의 값을 가져온다.

    res.redirect('/admin/list');
});


//http://localhost:5001/admin/delete
router.get('/delete', function(req, res, next) {
    res.redirect('/admin/list');
});

//http://localhost:5001/admin/modify/1
router.get('/modify/:id', function(req, res, next) { //파라미터방식을 사용하는 경우이다. 
    //또한 파라미터 방식을 사용하는 경우 제일 하단에다가 내려야한다.****

    res.render('admin/modify.ejs');
});



module.exports = router;