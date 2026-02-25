package com.tariketf.student_system_information.repository.academic;

import com.tariketf.student_system_information.model.academic.StudentEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentEnrollmentRepository extends JpaRepository<StudentEnrollment, Long> {
    // Efikasna metoda za dohvat studenata na kursu u određenoj godini
    List<StudentEnrollment> findByCourseIdAndAcademicYearId(Long courseId, Long academicYearId);

    // Ostale metode koje već imaš...
    List<StudentEnrollment> findByCourseId(Long courseId);
    List<StudentEnrollment> findByStudentId(Long studentId);
    List<StudentEnrollment> findByStudentIdAndAcademicYearId(Long studentId, Long academicYearId);
}