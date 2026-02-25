package com.tariketf.student_system_information.controller;

import com.tariketf.student_system_information.payload.user.UserDto;
import com.tariketf.student_system_information.service.AcademicService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentDashboardController {

    private final AcademicService academicService;

    public StudentDashboardController(AcademicService academicService) {
        this.academicService = academicService;
    }

    // Students will be able to check faculty assigned to the course
    @GetMapping("/courses/{courseId}/teachers")
    @PreAuthorize("hasAnyRole('STUDENT', 'SUPER_ADMIN')")
    public ResponseEntity<List<UserDto>> getTeachersForCourse(
            @PathVariable Long courseId,
            @RequestParam Long yearId
    ) {
        return ResponseEntity.ok(academicService.getTeachersOnCourse(courseId, yearId));
    }
}