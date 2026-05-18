package com.kwonjunbeom.bookmanagementapi.repository;

import com.kwonjunbeom.bookmanagementapi.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    // 조회 시 active가 true인 것만 가져오기
    List<Book> findAllByActiveTrue();

    Optional<Book> findByIdAndActiveTrue(Long id);

    List<Book> findByTitleAndActiveTrue(String title);
    List<Book> findByAuthorAndActiveTrue(String author);

    // 가장 최근 ISBN 가져오기 (이건 기존 쿼리 그대로 유지하되, active 조건만 살짝 추가해 줍니다)
    @Query(value = "SELECT b.isbn FROM books b WHERE b.active = true ORDER BY b.isbn DESC LIMIT 1", nativeQuery = true)
    Optional<String> findLastIsbn();
}
