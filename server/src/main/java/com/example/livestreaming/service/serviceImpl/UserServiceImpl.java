package com.example.livestreaming.service.serviceImpl;

import com.example.livestreaming.entity.Token;
import com.example.livestreaming.entity.User;
import com.example.livestreaming.repository.TokenRepository;
import com.example.livestreaming.repository.UserRepository;
import com.example.livestreaming.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    @Override
    public List<String> getToken(Integer id) {
        var tokenList = tokenRepository.findAllValidTokenByUser(id);
        return tokenList.stream().map(Token::getToken).collect(Collectors.toList());
    }

    @Override
    public List<User> getUsers() {
//        var users = userRepository.
        return null;
    }
}
