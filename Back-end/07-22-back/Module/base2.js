//base1 모듈을 참조해서 odd,even, test함수를 참조합니다.

//base1.js export module의 노출 객체를 객체 비구조화할당 방식으로 변수 odd, even, 함수test를 참조합니다.
const {odd,even, test}=require('./base1.js');  


//전달되는 숫자가 홀수인지 짝수인지 체크해서 홀짝 문자열 상수를 반환합니다.
//숫자를 던져주면 문자열로, 홀수이면 홀수입니다란 문자열을 반환하고, 짝수이면 짝수입니다란 문자열을 반환합니다.
function checkOddOrEven(num){

    //나누기 연산자: /, %: 나머지 연산자.
    // ex) num=10이면 10/2의 나머지값: 0
    //if(true=0)
    //만약에 num/2의 나머지값이 0이면 false
    
    //나어지값이 1(true)인 경우만 홀수이다.
    if(num%2){
        //나머지값이 홀수이면 odd
        return odd;
    }
    //나머지값이 짝수이면 even
    return even;
}

console.log("base2.js에서 사용하는 base1.js의 test함수 호출하기",test());

module.exports= checkOddOrEven;
