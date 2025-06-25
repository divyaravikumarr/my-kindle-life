package com.kindle.mykindle.repository;

import com.kindle.mykindle.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
