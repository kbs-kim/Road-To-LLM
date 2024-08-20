var express = require("express");
var router = express.Router();
//OpenAI API 호출을 위한 axios패키지 참조하기
const axios = require("axios");
//파일처리를 위한 file system 내장 객체 참조하기
const fs = require("fs");

//OpenAI 객체 생성하기
const { OpenAI } = require("openai");
const openai = new OpenAI({
  apikey: process.env.OPENAI_API_KEY,
});

/*
OPENAI Dalle3.API를 호출하여 프론트엔드에서 제공한 프롬프트기반 이미지 생성API
-호출주소: http://localhost:5000/api/openai
-호출방식: POST 
-응답결과: 생성된 이미지 json데이터 반환
*/
router.post("/dalle", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };
  try {
    //Step1: 프론트엔드에서 전달된 사용자 프롬프트 정보 추출하기
    const model = req.body.model;
    const prompt = req.body.prompt;
    //Step2: OpenAI Dalle API 호출하기
    const response = await openai.images.generate({
      model: model, //dall-e-2 or dall-e-3
      prompt: prompt, //사용자 프롬프트
      n: 1, //이미지 생성갯수(dalle2는 최대 10개, dalle3는 )
      size: "1024x1024", //dalle2: 256*258, 512*512, 1024*1024  dall3: 1024*1024, 1792*1024
      style: "vivid", //기본값: vivid, natural:dalle3만 지원- 더자연스럽고 초현실적인 이미지 생성
      response_format: "url", //url: openai사이트에 생성된 이미지 풀주소경로 반환, b64_json: 바이너리데이터를 base64로 인코딩된 json데이터로 반환
    });
    //Step3: Dalle API 호출결과에서 물리적 이미지 생성/ 서버공간에 저장하기
    //url방식으로 이미지 생성값을 반환받는 경우는 최대 1시간 이후에 openai이미지 서버에서 해당 이미지 삭제됨
    //해당 이미지가 영구적으로 필요하면 반환된 url주소를 이용해 이미지를 백엔드에 생성하시면 됩니다.
    const imageURL = response.data[0].url;
    console.log("dall 이미지 생성 URL경로: ", imageURL);


    






    axios({
      url: imageURL,
      responseType: "stream",
    })
      .then((response) => {
        response.data
          .pipe(fs.createWriteStream(imgFilePath))
          .on("finish", () => {
            console.log("Image saved successfully.");
          })
          .on("error", (err) => {
            console.error("Error saving image:", err);
          });
      })
      .catch((err) => {
        console.error("Error downloading image:", err);
    //Step4: 최종 생성된 이미지 데이터 추출하기

    //Step5: DB 게시글 테이블에 사용자 이미지 생성요청 정보 등록처리하기

    //Step6: 최종 생성된 이미지 정보를 프론트엔드로 반환하기
    apiResult.code = 200;
    apiResult.data = imageURL;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error Failed";
  }
  res.json(apiResult);
});

module.exports = router;
