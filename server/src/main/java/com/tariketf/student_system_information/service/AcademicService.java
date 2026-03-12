package com.tariketf.student_system_information.service;

import com.tariketf.student_system_information.model.User;
import com.tariketf.student_system_information.model.academic.*;
import com.tariketf.student_system_information.model.repository.UserRepository;
import com.tariketf.student_system_information.payload.user.UserDto;
import com.tariketf.student_system_information.repository.academic.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AcademicService {
    private final AcademicYearRepository yearRepo;
    private final ProgramRepository programRepo;
    private final CourseRepository courseRepo;
    private final CourseAssignmentRepository assignmentRepo;
    private final StudentEnrollmentRepository enrollmentRepo;
    private final UserRepository userRepo;
    private final ProgramLevelRepository programLevelRepo;
    private final StudyYearRepository studyYearRepo;

    public AcademicService(AcademicYearRepository yearRepo, ProgramRepository programRepo,
                           CourseRepository courseRepo, CourseAssignmentRepository assignmentRepo,
                           StudentEnrollmentRepository enrollmentRepo, UserRepository userRepo,
                           ProgramLevelRepository programLevelRepo, StudyYearRepository studyYearRepo) {
        this.yearRepo = yearRepo;
        this.programRepo = programRepo;
        this.courseRepo = courseRepo;
        this.assignmentRepo = assignmentRepo;
        this.enrollmentRepo = enrollmentRepo;
        this.userRepo = userRepo;
        this.programLevelRepo = programLevelRepo;
        this.studyYearRepo = studyYearRepo;
    }

    // Program Levels & Study Years (SPRINT 3 - ZADATAK 1)
    public ProgramLevel createProgramLevel(String name) {
        return programLevelRepo.save(new ProgramLevel(name));
    }
    public List<ProgramLevel> getAllProgramLevels() { return programLevelRepo.findAll(); }

    public StudyYear createStudyYear(String name) {
        return studyYearRepo.save(new StudyYear(name));
    }
    public List<StudyYear> getAllStudyYears() { return studyYearRepo.findAll(); }


    // Akademske Godine
    public AcademicYear createAcademicYear(String name){
        return yearRepo.save(new AcademicYear(name, true));
    }
    public List<AcademicYear> getAllYears() { return yearRepo.findAll(); }


    // Programi
    public Program createProgram(String name, int duration, Long programLevelId){
        ProgramLevel level = null;
        if (programLevelId != null) {
            level = programLevelRepo.findById(programLevelId)
                    .orElseThrow(() -> new RuntimeException("Program Level nije pronađen"));
        }
        return programRepo.save(new Program(name, duration, level));
    }
    public List<Program> getAllPrograms() { return programRepo.findAll(); }


    // Kursevi (Sada prihvata više programa - ManyToMany)
    @Transactional
    public Course createCourse(String name, int ects, String syllabus, List<Long> programIds){
        Set<Program> programs = new HashSet<>();
        if (programIds != null && !programIds.isEmpty()) {
            programs = new HashSet<>(programRepo.findAllById(programIds));
        }
        return courseRepo.save(new Course(name, ects, syllabus, programs));
    }
    public List<Course> getAllCourses() { return courseRepo.findAll(); }
    public Course getCourseById(Long id){
        return courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Kurs nije pronađen"));
    }


    // Dodjela Profesora i Studenata
    @Transactional
    public void assignTeacherToCourse(Long courseId, Long teacherId, Long academicYearId) {
        Course course = courseRepo.findById(courseId).orElseThrow(() -> new RuntimeException("Predmet nije pronađen"));
        User teacher = userRepo.findById(teacherId).orElseThrow(() -> new RuntimeException("Profesor nije pronađen"));
        AcademicYear year = yearRepo.findById(academicYearId).orElseThrow(() -> new RuntimeException("Godina nije pronađena"));
        assignmentRepo.save(new CourseAssignment(course, teacher, year));
    }

    @Transactional
    public void enrollStudentToCourse(Long courseId, Long studentId, Long academicYearId) {
        Course course = courseRepo.findById(courseId).orElseThrow(() -> new RuntimeException("Predmet nije pronađen"));
        User student = userRepo.findById(studentId).orElseThrow(() -> new RuntimeException("Student nije pronađen"));
        AcademicYear year = yearRepo.findById(academicYearId).orElseThrow(() -> new RuntimeException("Godina nije pronađena"));
        enrollmentRepo.save(new StudentEnrollment(course, student, year));
    }


    // Pregled Osoblja na Kursu
    public List<UserDto> getStudentsOnCourse(Long courseId, Long academicYearId) {
        return enrollmentRepo.findByCourseIdAndAcademicYearId(courseId, academicYearId)
                .stream().map(enrollment -> mapToDto(enrollment.getStudent())).collect(Collectors.toList());
    }

    public List<UserDto> getTeachersOnCourse(Long courseId, Long academicYearId) {
        return assignmentRepo.findByCourseIdAndAcademicYearId(courseId, academicYearId)
                .stream().map(assignment -> mapToDto(assignment.getTeacher())).collect(Collectors.toList());
    }

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