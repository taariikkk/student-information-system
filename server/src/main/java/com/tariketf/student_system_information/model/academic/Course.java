package com.tariketf.student_system_information.model.academic;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "ects_points", nullable = false)
    private int ectsPoints;

    @Column(columnDefinition = "TEXT")
    private String syllabus;

    // --- NOVO: Kurs sada može biti na više programa ---
    @ManyToMany
    @JoinTable(
            name = "course_programs",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "program_id")
    )
    private Set<Program> programs = new HashSet<>();

    public Course() {}

    public Course(String name, int ectsPoints, String syllabus, Set<Program> programs) {
        this.name = name;
        this.ectsPoints = ectsPoints;
        this.syllabus = syllabus;
        this.programs = programs;
    }

    // Getteri i Setteri
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getEctsPoints() { return ectsPoints; }
    public void setEctsPoints(int ectsPoints) { this.ectsPoints = ectsPoints; }
    public String getSyllabus() { return syllabus; }
    public void setSyllabus(String syllabus) { this.syllabus = syllabus; }
    public Set<Program> getPrograms() { return programs; }
    public void setPrograms(Set<Program> programs) { this.programs = programs; }
}