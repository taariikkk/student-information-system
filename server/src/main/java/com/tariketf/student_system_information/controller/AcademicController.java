package com.tariketf.student_system_information.controller;

import com.tariketf.student_system_information.model.academic.*;
import com.tariketf.student_system_information.payload.academic.*;
import com.tariketf.student_system_information.payload.user.UserDto;
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

    // GET METODE (Dohvatanje)

    @GetMapping("/levels")
    public ResponseEntity<List<ProgramLevel>> getAllProgramLevels() {
        return ResponseEntity.ok(academicService.getAllProgramLevels());
    }

    @GetMapping("/study-years")
    public ResponseEntity<List<StudyYear>> getAllStudyYears() {
        return ResponseEntity.ok(academicService.getAllStudyYears());
    }

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

    @GetMapping("/courses/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id){
        return ResponseEntity.ok(academicService.getCourseById(id));
    }


    // POST METODE

    @PostMapping("/levels")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ProgramLevel> createLevel(@RequestBody SimpleNameRequest request) {
        return ResponseEntity.ok(academicService.createProgramLevel(request.getName()));
    }

    @PostMapping("/study-years")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<StudyYear> createStudyYear(@RequestBody SimpleNameRequest request) {
        return ResponseEntity.ok(academicService.createStudyYear(request.getName()));
    }

    @PostMapping("/years")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<AcademicYear> createYear(@RequestBody AcademicYearRequest request) {
        return ResponseEntity.ok(academicService.createAcademicYear(request.getName()));
    }

    @PostMapping("/programs")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Program> createProgram(@RequestBody ProgramRequest request) {
        return ResponseEntity.ok(academicService.createProgram(
                request.getName(),
                request.getDuration(),
                request.getProgramLevelId()
        ));
    }

    @PostMapping("/courses")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Course> createCourse(@RequestBody CourseRequest request) {
        return ResponseEntity.ok(academicService.createCourse(
                request.getName(),
                request.getEcts(),
                request.getSyllabus(),
                request.getProgramIds()
        ));
    }

    // METODE ZA POVEZIVANJE
    @PostMapping("/courses/{courseId}/assign-teacher/{teacherId}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<String> assignTeacher(
            @PathVariable Long courseId, @PathVariable Long teacherId, @RequestParam Long yearId) {
        academicService.assignTeacherToCourse(courseId, teacherId, yearId);
        return ResponseEntity.ok("Uspješno dodijeljen profesor na predmet!");
    }

    @PostMapping("/courses/{courseId}/enroll-student/{studentId}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<String> enrollStudent(
            @PathVariable Long courseId, @PathVariable Long studentId, @RequestParam Long yearId) {
        academicService.enrollStudentToCourse(courseId, studentId, yearId);
        return ResponseEntity.ok("Uspješno upisan student na predmet!");
    }

    @GetMapping("/courses/{courseId}/students")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<UserDto>> getStudentsOnCourse(
            @PathVariable Long courseId, @RequestParam Long yearId) {
        return ResponseEntity.ok(academicService.getStudentsOnCourse(courseId, yearId));
    }

    @GetMapping("/courses/{courseId}/teachers")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<UserDto>> getTeachersOnCourse(
            @PathVariable Long courseId, @RequestParam Long yearId) {
        return ResponseEntity.ok(academicService.getTeachersOnCourse(courseId, yearId));
    }
}