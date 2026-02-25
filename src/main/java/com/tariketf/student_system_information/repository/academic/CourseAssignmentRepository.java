package com.tariketf.student_system_information.repository.academic;

import com.tariketf.student_system_information.model.academic.CourseAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment, Long> {
    // Efikasna metoda za dohvat profesora na kursu u određenoj godini
    List<CourseAssignment> findByCourseIdAndAcademicYearId(Long courseId, Long academicYearId);

    // Ostale metode...
    List<CourseAssignment> findByCourseId(Long courseId);
    List<CourseAssignment> findByTeacherId(Long teacherId);
    List<CourseAssignment> findByTeacherIdAndAcademicYearId(Long teacherId, Long academicYearId);
}