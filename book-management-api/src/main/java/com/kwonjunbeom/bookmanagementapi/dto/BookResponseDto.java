package com.kwonjunbeom.bookmanagementapi.dto;

import com.kwonjunbeom.bookmanagementapi.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookResponseDto {
    private Long id;
    private String title;
    private String author;
    private Integer price;
    private Integer publishedYear;
    private String isbn;
    private Boolean active;
    private Boolean available;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public static BookResponseDto fromEntity(Book book) {
        return BookResponseDto.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .price(book.getPrice())
                .publishedYear(book.getPublishedYear())
                .isbn(book.getIsbn())
                .active(book.getActive())
                .available(book.getAvailable())
                .createdDate(book.getCreatedDate())
                .modifiedDate(book.getModifiedDate())
                .build();
    }
}
