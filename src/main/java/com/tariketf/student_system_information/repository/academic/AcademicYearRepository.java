package com.tariketf.student_system_information.repository.academic;

import com.tariketf.student_system_information.model.academic.AcademicYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AcademicYearRepository extends JpaRepository<AcademicYear, Long> {
    Optional<AcademicYear> findByName(String name);
    Optional<AcademicYear> findByActiveTrue(); // Za pronalaženje trenutno aktivne godine
}