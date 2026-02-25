package com.tariketf.student_system_information.payload.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest {
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;
    private String password;
}
