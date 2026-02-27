package com.tariketf.student_system_information.controller;

import com.tariketf.student_system_information.model.academic.AcademicYear;
import com.tariketf.student_system_information.model.academic.Course;
import com.tariketf.student_system_information.model.academic.Program;
import com.tariketf.student_system_information.payload.academic.AcademicYearRequest;
import com.tariketf.student_system_information.payload.academic.CourseRequest;
import com.tariketf.student_system_information.payload.academic.ProgramRequest;
import com.tariketf.student_system_information.service.AcademicService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/academic")
public class AcademicController {

    private final AcademicService academicService;

    public AcademicController(AcademicService academicService) {
        this.academicService = academicService;
    }

    // GET METODE
    @GetMapping("/years")
    public ResponseEntity<List<AcademicYear>> getAllYears() {
        return ResponseEntity.ok(academicService.getAllYears());
    }

    @GetMapping("/programs")
    public ResponseEntity<List<Program>> getAllPrograms() {
        return ResponseEntity.ok(academicService.getAllPrograms());
    }

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(academicService.getAllCourses());
    }

    // POST METODE
    @PostMapping("/years")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<AcademicYear> createYear(@RequestBody AcademicYearRequest request) {
        return ResponseEntity.ok(academicService.createAcademicYear(request.getName()));
    }

    @PostMapping("/programs")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Program> createProgram(@RequestBody ProgramRequest request) {
        return ResponseEntity.ok(academicService.createProgram(request.getName(), request.getDuration()));
    }

    @PostMapping("/courses")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Course> createCourse(@RequestBody CourseRequest request) {
        return ResponseEntity.ok(academicService.createCourse(
                request.getName(),
                request.getEcts(),
                request.getSyllabus(),
                request.getProgramId()
        ));
    }

    // METODE ZA POVEZIVANJE
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