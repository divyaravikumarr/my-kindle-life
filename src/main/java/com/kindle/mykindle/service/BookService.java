package com.kindle.mykindle.service;

import com.kindle.mykindle.entity.Book;
import com.kindle.mykindle.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository repo;

    public Book save(Book book) {
        return repo.save(book);
    }

    public List<Book> getAll() {
        return repo.findAll();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Book get(Long id) {
        return repo.findById(id).orElse(null);
    }
}
