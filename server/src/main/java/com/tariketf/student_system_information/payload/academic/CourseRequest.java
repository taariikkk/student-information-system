package com.tariketf.student_system_information.payload.academic;

import lombok.Data;

@Data
public class CourseRequest {
    private String name;
    private int ects;
    private String syllabus;
    private Long programId;
}