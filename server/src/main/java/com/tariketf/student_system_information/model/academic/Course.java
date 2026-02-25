package com.tariketf.student_system_information.model.academic;

import jakarta.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "program_id")
    private Program program;

    public Course() {}

    public Course(String name, int ectsPoints, String syllabus, Program program) {
        this.name = name;
        this.ectsPoints = ectsPoints;
        this.syllabus = syllabus;
        this.program = program;
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
    public Program getProgram() { return program; }
    public void setProgram(Program program) { this.program = program; }
}