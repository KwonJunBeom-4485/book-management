package com.kwonjunbeom.bookmanagementapi.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private Integer price;
    private Integer publishedYear;
    @Column(unique = true, length = 13)
    private String isbn;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    private LocalDateTime modifiedDate;
    private Boolean active;
    private Boolean available;

    @Builder
    public Book(String title, String author, Integer price, Integer publishedYear, String isbn, Boolean active, Boolean available) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.publishedYear = publishedYear;
        this.isbn = isbn;
        this.active = active;
        this.available = available;
        this.createdDate = LocalDateTime.now();
        this.modifiedDate = LocalDateTime.now();
    }

    public void bookUpdated(String title, String author, Integer price, Integer publishedYear, Boolean available) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.publishedYear = publishedYear;
        this.available = available;
        this.modifiedDate = LocalDateTime.now();
    }

    public void deleteBook() {
        this.active = false;
        this.available = false;
    }


}
