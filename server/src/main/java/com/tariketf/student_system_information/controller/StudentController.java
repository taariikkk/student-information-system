package com.tariketf.student_system_information.controller;

import com.tariketf.student_system_information.payload.user.UserDto;
import com.tariketf.student_system_information.service.AcademicService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final AcademicService academicService;

    public StudentController(AcademicService academicService) {
        this.academicService = academicService;
    }

    // Student vidi listu profesora na predmetu
    @GetMapping("/course/{courseId}/teachers")
    @PreAuthorize("hasAnyRole('STUDENT', 'SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<UserDto>> getTeachersForCourse(
            @PathVariable Long courseId,
            @RequestParam Long yearId
    ) {
        return ResponseEntity.ok(academicService.getTeachersOnCourse(courseId, yearId));
    }
}