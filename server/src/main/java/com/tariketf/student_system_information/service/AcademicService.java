package com.tariketf.student_system_information.service;

import com.tariketf.student_system_information.model.User;
import com.tariketf.student_system_information.model.academic.*;
import com.tariketf.student_system_information.model.repository.UserRepository;
import com.tariketf.student_system_information.payload.user.UserDto;
import com.tariketf.student_system_information.repository.academic.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AcademicService {
    private final AcademicYearRepository yearRepo;
    private final ProgramRepository programRepo;
    private final CourseRepository courseRepo;
    private final CourseAssignmentRepository assignmentRepo;
    private final StudentEnrollmentRepository enrollmentRepo;
    private final UserRepository userRepo;

    public AcademicService(AcademicYearRepository yearRepo, ProgramRepository programRepo,
                           CourseRepository courseRepo, CourseAssignmentRepository assignmentRepo,
                           StudentEnrollmentRepository enrollmentRepo, UserRepository userRepo) {
        this.yearRepo = yearRepo;
        this.programRepo = programRepo;
        this.courseRepo = courseRepo;
        this.assignmentRepo = assignmentRepo;
        this.enrollmentRepo = enrollmentRepo;
        this.userRepo = userRepo;
    }

    // Ovdje kreirano Akademske godine
    public AcademicYear createAcademicYear(String name){
        return yearRepo.save(new AcademicYear(name, true));
    }

    // Kreiranje Programa
    public Program createProgram(String name, int duration){
        return programRepo.save(new Program(name, duration));
    }

    // Kreiranje Kursa (Course)
    public Course createCourse(String name, int ects, String syllabus, Long programId){
        Program program = programRepo.findById(programId)
                .orElseThrow(() -> new RuntimeException("Program nije pronađen"));
        return courseRepo.save(new Course(name, ects, syllabus, program));
    }

    // Dodjela Profesora na predmet

    @Transactional
    public void assignTeacherToCourse(Long courseId, Long teacherId, Long academicYearId) {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Predmet nije pronađen"));

        User teacher = userRepo.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Profesor nije pronađen"));

        AcademicYear year = yearRepo.findById(academicYearId)
                .orElseThrow(() -> new RuntimeException("Godina nije pronađena"));

        CourseAssignment assignment = new CourseAssignment(course, teacher, year);
        assignmentRepo.save(assignment);
    }

    // Upis Studenta na Predmet (Enrollment)
    @Transactional
    public void enrollStudentToCourse(Long courseId, Long studentId, Long academicYearId) {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Predmet nije pronađen"));

        User student = userRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student nije pronađen"));

        AcademicYear year = yearRepo.findById(academicYearId)
                .orElseThrow(() -> new RuntimeException("Godina nije pronađena"));

        StudentEnrollment enrollment = new StudentEnrollment(course, student, year);
        enrollmentRepo.save(enrollment);
    }

    // Profesor gleda studente
    public List<UserDto> getStudentsOnCourse(Long courseId, Long academicYearId) {
        return enrollmentRepo.findByCourseIdAndAcademicYearId(courseId, academicYearId)
                .stream()
                .map(enrollment -> mapToDto(enrollment.getStudent()))
                .collect(Collectors.toList());
    }

    // Student gleda profesore
    public List<UserDto> getTeachersOnCourse(Long courseId, Long academicYearId) {
        return assignmentRepo.findByCourseIdAndAcademicYearId(courseId, academicYearId)
                .stream()
                .map(assignment -> mapToDto(assignment.getTeacher()))
                .collect(Collectors.toList());
    }

    public List<AcademicYear> getAllYears(){
        return yearRepo.findAll();
    }

    public List<Program> getAllPrograms(){
        return programRepo.findAll();
    }

    public List<Course> getAllCourses(){
        return courseRepo.findAll();
    }

    // Pomoćna metoda za mapiranje User -> UserDto
    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .build();
    }
}
