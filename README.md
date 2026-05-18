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
