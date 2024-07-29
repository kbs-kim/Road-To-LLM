var express = require('express');
var router = express.Router();

/* 
- 사용자 계정 관리 웹페이지/데이터처리 요청과 응답 기능
- 요청주소: http://localhost:5001/member/list
- 요청방식: Get
*/
router.get('/list', function(req, res, next) {
    res.render('admin/list.ejs');
});



// http://localhost:5001/member/modify : get

router.get('/modify', function(req, res, next) {
    res.render('admin/modify.ejs');
});

// http://localhost:5001/member/modify : post 
router.post('/modify', function(req, res, next) {
    res.redirect('/admin/list');
});


// http://localhost:5001/member/delete : get
router.get('delete', function(req, res, next) {
    res.redirect('/admin/list');
});


module.exports = router;