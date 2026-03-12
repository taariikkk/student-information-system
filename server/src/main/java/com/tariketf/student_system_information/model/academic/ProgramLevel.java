package com.tariketf.student_system_information.model.academic;

import jakarta.persistence.*;

@Entity
@Table(name = "program_levels")
public class ProgramLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // npr. Bachelor, Master, PhD

    public ProgramLevel() {}
    public ProgramLevel(String name) { this.name = name; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}