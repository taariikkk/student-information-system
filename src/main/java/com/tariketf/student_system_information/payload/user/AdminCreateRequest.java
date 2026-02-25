package com.tariketf.student_system_information.payload.user;

import com.tariketf.student_system_information.model.enums.FacultyType;
import com.tariketf.student_system_information.model.enums.Role;
import com.tariketf.student_system_information.model.enums.StudentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminCreateRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;
    private Role role;
    private FacultyType facultyType;
    private StudentType studentType;
}
