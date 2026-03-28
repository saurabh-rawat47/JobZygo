package com.tony.JobZygo.controller;

import com.tony.JobZygo.entity.JobPost;
import com.tony.JobZygo.service.PostService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    PostService postService;

    // @RequestMapping(value = "/")
    // public void redirect(HttpServletResponse response) throws IOException {
    // response.sendRedirect("/swagger-ui.html");
    //
    // }

    @GetMapping("/jobs")
    public ResponseEntity<List<JobPost>> getAllPost() {
        List<JobPost> allPost = postService.getAllPost();
        return new ResponseEntity<>(allPost, HttpStatus.OK);
    }

    @GetMapping("/jobs/search/{text}")
    public ResponseEntity<List<JobPost>> search(@PathVariable String text) {
        List<JobPost> postByText = postService.findPostByText(text);
        return new ResponseEntity<>(postByText, HttpStatus.OK);
    }

    @PostMapping("/jobs")
    public ResponseEntity<JobPost> createJP(@RequestBody JobPost jobPost) {
        postService.createJP(jobPost);
        return new ResponseEntity<>(jobPost, HttpStatus.CREATED);
    }

}
