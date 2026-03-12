package com.tariketf.student_system_information.repository.academic;
import com.tariketf.student_system_information.model.academic.ProgramLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramLevelRepository extends JpaRepository<ProgramLevel, Long> {}