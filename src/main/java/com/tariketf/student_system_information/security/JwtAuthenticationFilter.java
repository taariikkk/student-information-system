package com.tariketf.student_system_information.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    // Ručni konstruktor (Dependency Injection)
    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Dohvati Authorization header
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // Ako header ne postoji ili ne počinje sa "Bearer ", nastavi dalje (možda je login ruta)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Izvuci sam token (bez "Bearer " dijela)
        jwt = authHeader.substring(7);

        // Izvuci email iz tokena
        userEmail = jwtService.extractUsername(jwt);

        // 2. Ako imamo email i korisnik još nije autentifikovan u kontekstu
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Učitaj detalje korisnika iz baze
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // 3. Provjeri da li je token validan
            if (jwtService.isTokenValid(jwt, userDetails)) {

                // Kreiraj autentifikaciju za Spring Security
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // Postavi korisnika kao ulogovanog
                SecurityContextHolder.getContext().setAuthentication(authToken);

                // --- SPRINT ZAHTJEV C: PRODUŽI TOKEN ---
                // Generiši NOVI token sa svježih 30 minuta
                String freshToken = jwtService.generateToken(userDetails);

                // Dodaj novi token u response header da ga frontend može pokupiti
                response.setHeader("Authorization", "Bearer " + freshToken);
                // Ovo omogućava frontendu da pročita ovaj header (CORS)
                response.setHeader("Access-Control-Expose-Headers", "Authorization");
            }
        }

        // Nastavi lanac filtera
        filterChain.doFilter(request, response);
    }
}