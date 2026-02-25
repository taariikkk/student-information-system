package com.tariketf.student_system_information.model.repository;

import com.tariketf.student_system_information.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Za login emailom
    Optional<User> findByEmail(String email);

    // Za login telefonom (Sprint zahtjev 2)
    Optional<User> findByPhoneNumber(String phoneNumber);

    // Provjera postojanja
    boolean existsByEmail(String email);
}