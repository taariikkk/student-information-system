package com.tariketf.student_system_information.service;

import com.tariketf.student_system_information.model.User;
import com.tariketf.student_system_information.model.enums.AuthProvider;
import com.tariketf.student_system_information.model.repository.UserRepository;
import com.tariketf.student_system_information.payload.auth.AuthenticationRequest;
import com.tariketf.student_system_information.payload.auth.AuthenticationResponse;
import com.tariketf.student_system_information.payload.auth.RegisterRequest;
import com.tariketf.student_system_information.payload.user.UserDto;
import com.tariketf.student_system_information.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        var user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAddress(request.getAddress());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(mapToUserDto(user))
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // Pokušaj naći korisnika po Emailu ILI Telefonu
        var userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            userOptional = userRepository.findByPhoneNumber(request.getEmail());
        }

        var user = userOptional.orElseThrow(() -> new RuntimeException("Korisnik nije pronađen"));

        // Autentifikacija
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(), // Ovo vraća email
                        request.getPassword()
                )
        );

        // Generisanje tokena
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(mapToUserDto(user))
                .build();
    }

    private UserDto mapToUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }
}