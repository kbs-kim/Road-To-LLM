
//서버상의 경로를 조회하는 패키지 참조
const path = require('path');

//시퀄라이즈 ORM 프레임워크 객체 참조
//대문자 Sequelize*** : 각종 sequelize ORM 프레임워크내에서 제공하는 객체, 데이터 타입등을 제공합니다.
const Sequelize = require('sequelize');



//개발모드 환경설정
const env = process.env.NODE_ENV || 'development';


//DB연결 환경설정정보 변경처리//관련정보 수정
// __dirname : 현재 모듈(index.js)의 물리적 경로 조회 
const config = require(path.join(__dirname,'..','config','config.json'))[env];



//데이터 베이스 객체 (지금은 비어있다)***
const db= {};

//DB연결정보로 시퀄라이즈 ORM 객체 생성
//소문자 sequelize*** 실제 DB서버에 연결하고 DB서버에 SQL구문을 전달해서 데이터를 처리하는 기능제공  
const sequelize = new Sequelize(config.database,config.username,config.password,config);


//(여기서 추가)***
//DB 처리 객체에 시퀄라이즈 정보 맵핑처리 
//이후 DB객체를 통해 데이터 관리가능해짐
db.sequelize = sequelize; //DB연결정보를 포함한 DB제어 객체속성(CRUD)
db.Sequelize = Sequelize; //Sequelize팩키지에서 제공하는 각종 데이터 타입 및 관련 객체정보를 제공함



//회원모델 모듈파일 참조하고 db속성정의하기
//db.Member = require('./member.js')(sequelize,Sequelize);
//db객체 외부로 노출하기
module.exports = db;