package com.kwonjunbeom.bookmanagementapi.config;

import com.kwonjunbeom.bookmanagementapi.dto.BookRequestDto;
import com.kwonjunbeom.bookmanagementapi.repository.BookRepository;
import com.kwonjunbeom.bookmanagementapi.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final BookService bookService;
    private final BookRepository bookRepository;

    @Override
    public void run(String... args) throws Exception {
        // 💡 중복 실행 방지: 데이터베이스가 비어있을 때만 초기 데이터 입력
        if (bookRepository.count() == 0) {

            // 1번 샘플 도서
            bookService.createBook(BookRequestDto.builder()
                    .title("데이터마이닝")
                    .author("홍길동")
                    .price(30000)
                    .publishedYear(2026)
                    .available(true)
                    .build());

            // 2번 샘플 도서
            bookService.createBook(BookRequestDto.builder()
                    .title("실전 스프링 부트와 Next.js")
                    .author("이순신")
                    .price(35000)
                    .publishedYear(2025)
                    .available(true)
                    .build());

            // 3번 샘플 도서 (대출 중 상태 예시)
            bookService.createBook(BookRequestDto.builder()
                    .title("자바 ORM 표준 JPA 프로그래밍")
                    .author("김영한")
                    .price(43000)
                    .publishedYear(2024)
                    .available(false)
                    .build());

            // 4번 샘플 도서
            bookService.createBook(BookRequestDto.builder()
                    .title("모던 자바인액션")
                    .author("라울-게이브리얼 우르마")
                    .price(28000)
                    .publishedYear(2023)
                    .available(true)
                    .build());

            // 5번 샘플 도서
            bookService.createBook(BookRequestDto.builder()
                    .title("클린 코드 (Clean Code)")
                    .author("로버트 C. 마틴")
                    .price(33000)
                    .publishedYear(2022)
                    .available(true)
                    .build());

            System.out.println(">> [System] 기초 도서 데이터 5개 등록이 완료되었습니다.");
        }
    }
}