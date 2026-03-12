package com.tariketf.student_system_information.payload.academic;
import lombok.Data;
import java.util.List;

@Data
public class CourseRequest {
    private String name;
    private int ects;
    private String syllabus;
    private List<Long> programIds;
}