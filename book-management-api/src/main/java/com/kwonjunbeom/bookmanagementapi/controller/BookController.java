package com.kwonjunbeom.bookmanagementapi.controller;

import com.kwonjunbeom.bookmanagementapi.dto.BookRequestDto;
import com.kwonjunbeom.bookmanagementapi.dto.BookResponseDto;
import com.kwonjunbeom.bookmanagementapi.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {
    private final BookService service;

    // 도서 전체 조회
    @GetMapping
    public ResponseEntity<List<BookResponseDto>> findAll() {
        List<BookResponseDto> books = service.getAllBooks();

        return ResponseEntity.ok(books);
    }

    // 도서 등록
    @PostMapping
    public ResponseEntity<Long> createBook(@Valid @RequestBody BookRequestDto requestDto) {
        Long bookId = service.createBook(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(bookId);
    }

    // 특정 도서 조회(id)
    @GetMapping("/{id}")
    public ResponseEntity<BookResponseDto> findById(@PathVariable Long id) {
        BookResponseDto book = service.getBookById(id);

        return ResponseEntity.ok(book);
    }

    // 도서 수정
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateBook(
            @PathVariable Long id,
            @Valid @RequestBody BookRequestDto requestDto) {
        service.updateBook(id, requestDto);

        return ResponseEntity.ok().build();
    }

    // 도서 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        service.deleteBook(id);

        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleNotFoundException(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }


}
