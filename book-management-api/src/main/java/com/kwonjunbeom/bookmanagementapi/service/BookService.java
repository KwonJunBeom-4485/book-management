package com.kwonjunbeom.bookmanagementapi.service;

import com.kwonjunbeom.bookmanagementapi.dto.BookRequestDto;
import com.kwonjunbeom.bookmanagementapi.dto.BookResponseDto;
import com.kwonjunbeom.bookmanagementapi.entity.Book;
import com.kwonjunbeom.bookmanagementapi.repository.BookRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BookService {
    private final BookRepository repository;

    // 책 등록
    @Transactional
    public Long createBook(BookRequestDto requestDto) {
        int currentYear = LocalDate.now().getYear();
        if(requestDto.getPublishedYear() > currentYear) {
            throw new IllegalArgumentException("출판연도는 현재 년도를 초과할 수 없습니다.");
        }

        String autoIsbn = repository.findLastIsbn()
                .map(lastIsbn -> {
                    long isbnNum = Long.parseLong(lastIsbn);
                    return String.valueOf(isbnNum + 1);
                })
                .orElse("9788910000000");

        Book book = Book.builder()
                .title(requestDto.getTitle())
                .author(requestDto.getAuthor())
                .price(requestDto.getPrice())
                .publishedYear(requestDto.getPublishedYear())
                .isbn(autoIsbn)
                .active(true)
                .available(true)
                .build();

        Book savedBook = repository.save(book);
        return savedBook.getId();
    }

    public List<BookResponseDto> getAllBooks() {
        return repository.findAllByActiveTrue().stream()
                .map(BookResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    public BookResponseDto getBookById(Long id) {
        Book book = repository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 도서입니다."));
        return BookResponseDto.fromEntity(book);
    }

    @Transactional
    public void updateBook(Long id, BookRequestDto requestDto) {
        Book book = repository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new IllegalArgumentException("수정하려는 도서가 존재하지 않습니다."));

        book.bookUpdated(
                requestDto.getTitle(),
                requestDto.getAuthor(),
                requestDto.getPrice(),
                requestDto.getPublishedYear(),
                requestDto.getAvailable()
        );
    }

    @Transactional
    public void deleteBook(Long id) {
        Book book = repository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new IllegalArgumentException("삭제하려는 도서가 존재하지 않습니다. ID: " + id));

        book.deleteBook();
        System.out.println("도서 삭제 완료");
    }

    public List<BookResponseDto> searchBooksByTitle(String title) {
        // 하나의 검색어(title)를 제목 조건과 저자 조건에 각각 매핑
        return repository.findByTitleContainingAndActiveTrueOrAuthorContainingAndActiveTrue(title, title).stream()
                .map(BookResponseDto::fromEntity)
                .collect(Collectors.toList());
    }


}
