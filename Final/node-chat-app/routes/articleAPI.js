var express =require('ex[ress');
var router = express.Router();


//ORM db객체 참조하기
var db = require('../models/index');


/*전체 게시글 목록 조회 요청 및 응답처리 API 라우팅 메소드
- URL: http://localhost:3000/article/list
- Method: GET
-응답 결과: 전체 게시글 목록 데이터

*/
router.get('/list', async function(req, res) {
    let apiResult = {
        code: 400,
        data: null,
        msg: "",
    };

    try {
        const articles = await db.Article.findAll(); // 비동기 작업
        apiResult.data = articles;
        apiResult.msg = "OK";
        apiResult.code = 200; // 성공 코드를 반환
    } catch (err) {
        apiResult.msg = "Error occurred"; // 에러 메시지 설정
    }

    res.json(apiResult);
});
