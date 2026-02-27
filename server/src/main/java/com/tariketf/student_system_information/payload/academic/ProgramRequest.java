package com.tariketf.student_system_information.payload.academic;

import lombok.Data;

@Data
public class ProgramRequest {
    private String name;
    private int duration;
}