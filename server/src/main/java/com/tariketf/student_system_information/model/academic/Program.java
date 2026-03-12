package com.tariketf.student_system_information.model.academic;

import jakarta.persistence.*;

@Entity
@Table(name = "programs")
public class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "program_duration", nullable = false)
    private int durationInYears;

    @ManyToOne
    @JoinColumn(name = "program_level_id")
    private ProgramLevel programLevel;

    public Program(){}
    public Program(String name, int durationInYears, ProgramLevel programLevel){
        this.name = name;
        this.durationInYears = durationInYears;
        this.programLevel = programLevel;
    }

    // Getteri i Setteri
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getDurationInYears() { return durationInYears; }
    public void setDurationInYears(int durationInYears) { this.durationInYears = durationInYears; }
    public ProgramLevel getProgramLevel() { return programLevel; }
    public void setProgramLevel(ProgramLevel programLevel) { this.programLevel = programLevel; }
}