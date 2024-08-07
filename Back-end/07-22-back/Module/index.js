const { odd, even } = require('./base1.js');
const checkOddOrEven = require('./base2.js');

//base1.js모듈내 odd,even상수 참조하기

//base2.js모듈내 checkOddOrEven함수 참조하기

//문자열을 던지면 문자열이 길이가 짝수이면 짝수입니다란 문자열을 반환
//홀수이면 홀수입니다란 문자열 상수를 반환한다.

function checkStringOddOrEven(str){
    if(str.length%2){
        //문자열길이를 2로 나눈 나머지 값이 1(true)이면 홀수입니다.
        return odd; //홀수입니다. 상수 문자열 반환
    }
    else{
        //문자열 길이를 2로 나눈 나머지 값이 0이면 event반환
        return even; //짝수입니다. 상수 문자열 반환
    
    }
}

//base2.js모듈내 노출함수를 재사용한다
console.log("숫자에 대한 홀짝수 체크하기:",checkOddOrEven(10));
console.log("숫자에 대한 홀짝수 체크하기:",checkOddOrEven(5));

//홀짝 문자열 상수를 출력할때 base1.js모듈내 상수를 참조해 재사용한다.
console.log("문자열 길이에 대한 홀짝수 체크하기3:",checkStringOddOrEven("hello"));
console.log("문자열 길이에 대한 홀짝수 체크하기4:",checkStringOddOrEven("hi"));