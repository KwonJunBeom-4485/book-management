book-management-front/ 경로에 .env.local 생성 후  

NEXT_PUBLIC_API_URL=http://localhost:8080 입력  
book-management-api> ./gradlew bootRun  
book-management-front> npm install  
book-management-front> npm run dev  
책 리스트를 보여주는 메인 페이지  
수정을 누르면 상세 정보 확인 가능  
/register 에서 도서 등록 후 메인 페이지로 리다이렉트  
200, 201, 204, 404 등 status 처리 완료(postman에서 확인)  
도서 별 상세 페이지에서 스켈레톤 UI 사용  
config로 CORS 설정 완료
  
  
---------------------------------------------------------
# 📚 도서 정보 통합 관리 시스템 (Book Management System)
  
## 1. 배포 URL
* **Frontend (사용자 화면):** https://main.d3hhrcskqydcnv.amplifyapp.com/
* **Backend (API 서버):** http://book-management-backend-prod7.eba-kmkmemq9.ap-northeast-2.elasticbeanstalk.com
  
## 2. 소속 트랙
* **트랙명:** 트랙 C(Amplify + EB)
  
## 3. 시스템 아키텍처
  
* **Frontend:** Next.js 기반으로 구현되었으며, AWS Amplify를 통해 GitHub 브랜치와 연결되어 코드가 푸시되면 자동으로 빌드 및 배포(CI/CD)됩니다. 
  
* **Backend:** Spring Boot (Java 21) 기반의 REST API 서버입니다.  
AWS Elastic Beanstalk 환경에 배포되어 인프라 관리를 자동화했습니다.  
프론트엔드(HTTPS)와 백엔드(HTTP) 간의 통신 시 발생하는 Mixed Content 보안 에러를 해결하기 위해 Next.js의 Rewrites 프록시 우회 기법을 적용했습니다.  
  
* **Database:** AWS RDS (MySQL 8.0.46)를 사용합니다.  
보안을 위해 '퍼블릭 액세스'를 차단(No)하고,  
보안 그룹(Security Group) 체인을 구성하여 Elastic Beanstalk의 내부 EC2 인스턴스만 DB에 접근할 수 있도록 아키텍처를 설계했습니다.
  
## 4. 실행 방법
배포된 frontend 주소 복사(https://main.d3hhrcskqydcnv.amplifyapp.com/)  
  
백엔드가 작동하는지 알아보는 방법  
http://book-management-backend-prod7.eba-kmkmemq9.ap-northeast-2.elasticbeanstalk.com/actuator/health  
접속해서 status 확인.
  
### git 프로젝트 가져오고 싶을 때  
git clone https://github.com/KwonJunBeom-4485/book-management.git  