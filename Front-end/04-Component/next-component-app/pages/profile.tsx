//자식 컴포넌트 참조하기
import Personal from '@/components/personal';
import Company from '@/components/company';

const Profile = () => {
  return (
    <>
      {/* 자식요소에 props로 읽기전용 데이터를 전달합니다. */}
      <Personal
        name="김범수"
        email="test@test.co.kr"
        phone="010-1234-5678"
        age={50}
      >
        {/* 자식컴포넌턴의 children 값을 정의합니다. */}
        <b>사용자 기본프로필</b>
      </Personal>

      <hr></hr>

      <Company
        company="KBS"
        role="풀스택개발자"
        address="서울시 마포구 합정동"
      >
        <span>회사정보</span>
      </Company>
    </>
  );
};

export default Profile;