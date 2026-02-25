package com.tariketf.student_system_information.service;

import com.tariketf.student_system_information.model.User;
import com.tariketf.student_system_information.model.repository.UserRepository;
import com.tariketf.student_system_information.payload.user.UserDto;
import com.tariketf.student_system_information.payload.user.UserUpdateRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository1, PasswordEncoder passwordEncoder1){
        this.userRepository = userRepository1;
        this.passwordEncoder = passwordEncoder1;
    }

    // Metoda za dohvat profila
    public UserDto getUserProfile(String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Korisnik nije pronađen"));
        return mapToDto(user);
    }

    // Metoda za ažuriranje profila
    public UserDto updateUserProfile(String email, UserUpdateRequest request){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Korisnik nije pronađen"));

        if(request.getPassword() != null){
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        if(request.getPhoneNumber() != null){
            user.setPhoneNumber(request.getPhoneNumber());
        }

        if(request.getDateOfBirth() != null){
            user.setDateOfBirth(request.getDateOfBirth());
        }

        if(request.getAddress() != null){
            user.setAddress(request.getAddress());
        }

        User updatedUser = userRepository.save(user);
        return mapToDto(updatedUser);
    }

    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .password(user.getPassword())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .build();
    }
}
