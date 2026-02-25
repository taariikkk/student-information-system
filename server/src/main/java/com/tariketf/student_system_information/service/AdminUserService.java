package com.tariketf.student_system_information.service;

import com.tariketf.student_system_information.model.User;
import com.tariketf.student_system_information.model.enums.Role;
import com.tariketf.student_system_information.model.repository.UserRepository;
import com.tariketf.student_system_information.payload.user.AdminCreateRequest;
import com.tariketf.student_system_information.payload.user.UserDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminUserService(UserRepository userRepository1, PasswordEncoder passwordEncoder1){
        this.userRepository = userRepository1;
        this.passwordEncoder = passwordEncoder1;
    }

    // Metoda za kreiranje korisnika - Admin kreira
    public UserDto createUser(AdminCreateRequest request, Role creatorRole){
        if (creatorRole == Role.ADMIN){
            if(request.getRole() != Role.STUDENT){
                throw new RuntimeException("Nemate pravo kreirato ovog korisnika. Samo Admini mogu kreirati studente!");
            }
        }
        // Za SUPER ADMINA ne pišemo nikakav uslov jer on nema ograničenja

        var user = new User();
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setAddress(request.getAddress());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setPhoneNumber(request.getPhoneNumber());

        if(request.getRole() == Role.FACULTY){
            user.setFacultyType(request.getFacultyType());
        } else if (request.getRole() == Role.STUDENT){
            user.setStudentType(request.getStudentType());
        }
        userRepository.save(user);

        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
