package com.tariketf.student_system_information.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {

        // Ovo se poziva kad korisnik nema token ili je token nevalidan

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401

        // Ručno pišemo JSON jer smo na niskom nivou (servlet level)
        String jsonResponse = String.format(
                "{\"statusCode\": 401, \"message\": \"Niste autorizovani. Molimo prijavite se.\", \"timestamp\": %d}",
                System.currentTimeMillis()
        );

        response.getOutputStream().println(jsonResponse);
    }
}