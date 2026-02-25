package com.tariketf.student_system_information.model.academic;

import jakarta.persistence.*;

@Entity
@Table(name = "academic_years")
public class AcademicYear {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = false)
    private String name;

    private boolean active;

    public AcademicYear(){}
    public AcademicYear(String name, boolean active){
        this.active = active;
        this.name = name;
    }

    // Getteri i Setteri
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
