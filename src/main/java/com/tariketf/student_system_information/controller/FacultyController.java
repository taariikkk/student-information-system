package com.tariketf.student_system_information.controller;

import com.tariketf.student_system_information.payload.user.UserDto;
import com.tariketf.student_system_information.service.AcademicService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    private final AcademicService academicService;

    public FacultyController(AcademicService academicService) {
        this.academicService = academicService;
    }

    // Profesor vidi listu studenata na predmetu
    @GetMapping("/course/{courseId}/students")
    @PreAuthorize("hasAnyRole('FACULTY', 'SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<UserDto>> getStudentsForCourse(
            @PathVariable Long courseId,
            @RequestParam Long yearId
    ) {
        return ResponseEntity.ok(academicService.getStudentsOnCourse(courseId, yearId));
    }
}