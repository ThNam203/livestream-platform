package com.example.livestreaming.controller;

import com.example.livestreaming.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping
    public ResponseEntity<String> getUsers () {
        return ResponseEntity.ok("server enabled");
    }
    @GetMapping("/token/{id}")
    public ResponseEntity<List<String>> getValidToken (@PathVariable Integer id) {
        var list = userService.getToken(id);
        return ResponseEntity.ok(list);
    }

}
