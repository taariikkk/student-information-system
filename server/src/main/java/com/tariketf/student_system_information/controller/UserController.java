package com.tariketf.student_system_information.controller;

import com.tariketf.student_system_information.payload.user.UserDto;
import com.tariketf.student_system_information.payload.user.UserUpdateRequest;
import com.tariketf.student_system_information.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService1){
        this.userService = userService1;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfile(Authentication authentication){
        String email = authentication.getName();
        return ResponseEntity.ok(userService.getUserProfile(email));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateProfile(
            Authentication authentication,
            @RequestBody UserUpdateRequest request
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.updateUserProfile(email, request));
    }
}
