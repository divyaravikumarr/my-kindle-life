package com.kindle.mykindle.controller;

import com.kindle.mykindle.entity.Book;
import com.kindle.mykindle.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private BookService bookService;

    @PostMapping
    public ResponseEntity<Book> uploadBook(
            @RequestParam String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String tags,
            @RequestParam MultipartFile file
    ) throws IOException {
        Files.createDirectories(Paths.get(UPLOAD_DIR));
        String filePath = UPLOAD_DIR + file.getOriginalFilename();
        Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

        Book book = new Book(null, title, author, tags, file.getOriginalFilename());
        return ResponseEntity.ok(bookService.save(book));
    }

    @GetMapping
    public List<Book> listBooks() {
        return bookService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> readBook(@PathVariable Long id) throws IOException {
        Book book = bookService.get(id);
        if (book == null) return ResponseEntity.notFound().build();

        File file = new File(UPLOAD_DIR + book.getFilename());
        if (!file.exists()) return ResponseEntity.notFound().build();

        Resource resource = new FileSystemResource(file);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getName() + "\"");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) throws IOException {
        Book book = bookService.get(id);
        if (book == null) return ResponseEntity.notFound().build();

        Files.deleteIfExists(Paths.get(UPLOAD_DIR + book.getFilename()));
        bookService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
