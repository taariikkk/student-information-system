package com.tariketf.student_system_information.model.academic;

import com.tariketf.student_system_information.model.User;
import jakarta.persistence.*;

@Entity
@Table(name = "course_assignments")
public class CourseAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private User teacher;

    @ManyToOne
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    public CourseAssignment() {
    }

    public CourseAssignment(Course course, User teacher, AcademicYear academicYear) {
        this.course = course;
        this.teacher = teacher;
        this.academicYear = academicYear;
    }

    // Getteri i Setteri (Standardni)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public User getTeacher() {
        return teacher;
    }

    public void setTeacher(User teacher) {
        this.teacher = teacher;
    }

    public AcademicYear getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(AcademicYear academicYear) {
        this.academicYear = academicYear;
    }
}