package com.tariketf.student_system_information.controller;

import com.tariketf.student_system_information.model.academic.AcademicYear;
import com.tariketf.student_system_information.model.academic.Course;
import com.tariketf.student_system_information.model.academic.Program;
import com.tariketf.student_system_information.service.AcademicService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/academic")
public class AcademicController {

    private final AcademicService academicService;

    public AcademicController(AcademicService academicService) {
        this.academicService = academicService;
    }

    @PostMapping("/years")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<AcademicYear> createYear(@RequestParam String name) {
        return ResponseEntity.ok(academicService.createAcademicYear(name));
    }

    @PostMapping("/programs")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Program> createProgram(@RequestParam String name, @RequestParam int duration) {
        return ResponseEntity.ok(academicService.createProgram(name, duration));
    }

    @PostMapping("/courses")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Course> createCourse(
            @RequestParam String name,
            @RequestParam int ects,
            @RequestParam String syllabus,
            @RequestParam Long programId
    ) {
        return ResponseEntity.ok(academicService.createCourse(name, ects, syllabus, programId));
    }

    // Dodjela profesora
    @PostMapping("/courses/{courseId}/assign-teacher/{teacherId}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<String> assignTeacher(
            @PathVariable Long courseId,
            @PathVariable Long teacherId,
            @RequestParam Long yearId
    ) {
        academicService.assignTeacherToCourse(courseId, teacherId, yearId);
        return ResponseEntity.ok("Uspješno dodijeljen profesor na predmet!");
    }

    // Upis studenta (Mogu i Super Admin i Admin)
    @PostMapping("/courses/{courseId}/enroll-student/{studentId}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<String> enrollStudent(
            @PathVariable Long courseId,
            @PathVariable Long studentId,
            @RequestParam Long yearId
    ) {
        academicService.enrollStudentToCourse(courseId, studentId, yearId);
        return ResponseEntity.ok("Uspješno upisan student na predmet!");
    }
}
