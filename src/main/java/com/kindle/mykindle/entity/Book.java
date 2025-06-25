package com.kindle.mykindle.entity;

import jakarta.persistence.*;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String tags;
    private String filename;

    public Book() {}

    public Book(Long id, String title, String author, String tags, String filename) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.tags = tags;
        this.filename = filename;
    }

    // getters and setters (or use Lombok if working)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }
}
