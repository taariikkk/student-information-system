package com.tariketf.student_system_information.repository.academic;

import com.tariketf.student_system_information.model.academic.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByProgramId(Long programId);
}