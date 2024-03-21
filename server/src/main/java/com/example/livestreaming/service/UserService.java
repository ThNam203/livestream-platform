package com.example.livestreaming.service;

import com.example.livestreaming.entity.User;

import java.util.List;

public interface UserService {
    public List<String> getToken (Integer id);
    public List<User> getUsers();
}
