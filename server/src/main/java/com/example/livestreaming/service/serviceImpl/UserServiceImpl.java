package com.example.livestreaming.service.serviceImpl;

import com.example.livestreaming.entity.Token;
import com.example.livestreaming.entity.User;
import com.example.livestreaming.mapper.UserMapper;
import com.example.livestreaming.payload.UserDTO;
import com.example.livestreaming.repository.TokenRepository;
import com.example.livestreaming.repository.UserRepository;
import com.example.livestreaming.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;
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
    public UserDTO getUser() {
        return UserMapper.toUserDTO(getAuthorizedUser());
    }

    @Override
    public User getAuthorizedUser() {
        var name = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(name).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
