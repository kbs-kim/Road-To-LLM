var express = require("express");
var router = express.Router();

//db 객체 참조하기
var db = require("../models/index");

//OpenAI API 호출을 위한 axios 패키지 참조하기
const axios = require("axios");
//파일 처리를 위한 file system 내장 객체 참조하기
const fs = require("fs");

//OpenAI 객체 생성하기
const { OpenAI } = require("openai");
const openai = new OpenAI({
  apikey: process.env.OPENAI_API_KEY,
});

/*
OPENAI Dalle3.API를 호출하여 프론트엔드에서 제공한 프롬프트 기반 이미지 생성 API
- 호출주소: http://localhost:5000/api/openai
- 호출방식: POST 
- 응답결과: 생성된 이미지 json 데이터 반환
*/
router.post("/dalle", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    // Step1: 프론트엔드에서 전달된 사용자 프롬프트 정보 추출하기
    const model = req.body.model;
    const prompt = req.body.prompt;

    // Step2: OpenAI Dalle API 호출하기
    const response = await openai.images.generate({
      model: model, // dall-e-2 or dall-e-3
      prompt: prompt, // 사용자 프롬프트
      n: 1, // 이미지 생성 갯수
      size: "1024x1024", // 이미지 크기
      style: "vivid", // 스타일 옵션
      response_format: "url", // url 방식으로 반환
    });

    // Step3: Dalle API 호출 결과에서 물리적 이미지 생성/서버 공간에 저장하기
    const imageURL = response.data[0].url;
    console.log("Dall 이미지 생성 URL 경로: ", imageURL);

    // 이미지 경로를 이용해 물리적 이미지 파일 생성하기
    const imgFileName = `sample-${Date.now()}.png`;
    const imgFilePath = `./public/ai/${imgFileName}`;

    // 이미지 다운로드 및 파일 저장 처리
    await axios({
      url: imageURL,
      responseType: "stream",
    }).then((response) => {
      return new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(imgFilePath))
          .on("finish", resolve)
          .on("error", reject);
      });
    });

    console.log("Image saved successfully.");

    // Step4: DB에 게시글 등록 처리
    const article = {
      board_type_code: 3,
      title: prompt,
      article_type_code: 0,
      view_count: 0,
      ip_address:
        req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      is_display_code: 1,
      reg_date: Date.now(),
    };

    const registedArticle = await db.Article.create(article);

    const articleFile = {
      article_id: registedArticle.dataValues.article_id,
      file_name: imgFileName,
      file_size: 0,
      file_path: `${process.env.DALLE_IMG_DOMAIN}/ai/${imgFileName}`, //도메인주소를 포함한 백엔드 이미지 전체 url경로
      file_type: "image/png",
      reg_date: Date.now(),
      reg_member_id: 1,
    };

    // Step5: 최종 생성된 이미지 정보를 프론트엔드로 반환하기
    await db.ArticleFile.create(articleFile);

    apiResult.code = 200;
    apiResult.data = imageURL;
    apiResult.msg = "OK";
  } catch (err) {
    console.error("Error:", err);
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error: Failed to generate image";
  }

  res.json(apiResult);
});

module.exports = router;
