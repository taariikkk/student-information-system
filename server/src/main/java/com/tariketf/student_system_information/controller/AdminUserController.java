package com.tariketf.student_system_information.controller;

import com.tariketf.student_system_information.payload.user.AdminCreateRequest;
import com.tariketf.student_system_information.payload.user.UserDto;
import com.tariketf.student_system_information.service.AdminUserService;
import com.tariketf.student_system_information.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {
    private final UserService userService;
    private final AdminUserService adminUserService;

    public AdminUserController(UserService userService1, AdminUserService adminUserService1){
        this.adminUserService = adminUserService1;
        this.userService = userService1;
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(
            @RequestBody AdminCreateRequest request,
            Authentication authentication
            ) {
        String currentEmail = authentication.getName();
        UserDto currentUser = userService.getUserProfile(currentEmail);

        return ResponseEntity.ok(adminUserService.createUser(request, currentUser.getRole()));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(adminUserService.getAllUsers());
    }
}
