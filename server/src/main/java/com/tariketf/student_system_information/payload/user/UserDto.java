package com.tariketf.student_system_information.payload.user;

import com.tariketf.student_system_information.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private String phoneNumber;
    private Role role;
}
