package com.leet.learning.ll_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Отключаем CSRF для простоты, но это не рекомендуется для продакшн
            .cors().and() // Включаем CORS
            .authorizeHttpRequests((requests) -> requests
                .requestMatchers("/", "/home", "/api/auth/register", "/api/auth/login").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Используем JWT, поэтому сессии не нужны
            .and()
            .formLogin().disable() // Отключаем форму логина, так как используем JWT
            .httpBasic().disable(); // Отключаем базовую аутентификацию

        return http.build();
    }
}