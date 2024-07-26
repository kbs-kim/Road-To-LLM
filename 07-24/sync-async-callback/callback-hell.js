//자바스크립트/ 노드 프로그래밍은 기본적으로 비동기 방식으로 작동한다.

//노드 프로그램이 비동기 방식으로 작동되는것을 눈으로 확인해보자
//setTimeout()함수는 특정시간(초)이 ***지난 후***에 특정로직이 실행되는 내장함수이다.

//setTimeout()함수가 실행되면 4초후에 내부로직이 실행된다.
var fnSample = function () {
  console.log("fnSample()함수가 실행됩니다....");
  setTimeout(function () {
    console.log("로직1실행완료-4초걸려요");
  }, 4000);

  setTimeout(function () {
    console.log("로직2실행완료-3초걸려요");
  }, 3000);

  setTimeout(function () {
    console.log("로직3실행완료-2초걸려요");
  }, 2000);

  setTimeout(function () {
    console.log("로직4실행완료-1초걸려요");
  }, 1000);
};

//위의 비동기 방식으로 작동되는 fnSample()함수로직을 동기방식(순차적 프로그래밍)으로 구현해보자..
//순서기반 로직1-> 로직2 -> 로직3 -> 로직4 순으로 실행되게 구현해보자.
//동기방식 기반으로 작동하는 함수로직 구현
//일반적으로 동기방식을 구현하기 위해 콜백함수를 사용함녀 콜백지옥이슈가 만들어진다.
//콜백지옥 이슈를 해결하기 위한 방식으로 자바스크립트에서는 promise/ async await라는 키워드를 제공한다.
//가장 최신의 비동기 방식으로 순차적 프로그래밍을 구현하는 방식은 async await이다.
//async await은 promise를 기반으로 동작한다.
var fnSyncSample = function () {
  console.log("fnSample()함수가 실행됩니다....");
  setTimeout(function () {
    console.log("로직1실행완료-4초걸려요");
    
    
    //로직1이 실행된 후에 로직2가 실행되게 구현
    //로직2실행
    setTimeout(function () {
        console.log("로직2실행완료-3초걸려요");

        setTimeout(function () {
            console.log("로직3실행완료-2초걸려요");


            setTimeout(function () {
                console.log("로직4실행완료-1초걸려요");
              }, 1000);



          }, 2000);




      }, 3000);




  }, 4000);
};

//비동기 방식으로 작동되는 fnSample()함수를 실행합니다.
//fnSample();


//동기방식으로 순차적 프로그래밍을 하려면 함수로직내에서 다른함수를 정의/실행하는 방식(콜백함수)을 사용하는데
//콜백함수를 계속사용하면 콜백지옥이 발생한다. 
fnSyncSample();