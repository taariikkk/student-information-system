package com.tariketf.student_system_information.repository.academic;
import com.tariketf.student_system_information.model.academic.StudyYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyYearRepository extends JpaRepository<StudyYear, Long> {}