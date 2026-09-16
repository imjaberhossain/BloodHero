package com.bloodhero.backend.controller;

import com.bloodhero.backend.dto.LoginRequest;
import com.bloodhero.backend.dto.OtpRequest;
import com.bloodhero.backend.dto.RegisterRequest;
import com.bloodhero.backend.model.User;
import com.bloodhero.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "এই ইমেইল দিয়ে ইতিপূর্বে রেজিস্টার করা হয়েছে!");
                return ResponseEntity.badRequest().body(error);
            }

            User newUser = new User();
            newUser.setName(request.getName());
            newUser.setEmail(request.getEmail());
            newUser.setPhone(request.getPhone());
            newUser.setBloodGroup(request.getBloodGroup());
            newUser.setDistrict(request.getDistrict());
            newUser.setPassword(request.getPassword());
            newUser.setIsAvailable(true);
            newUser.setVerified(false);

            User savedUser = userRepository.save(newUser);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "রেজিস্ট্রেশন সফল হয়েছে! OTP ভেরিফাই করুন।");
            response.put("user", savedUser);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("message", "রেজিস্ট্রেশন ব্যর্থ হয়েছে: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpRequest request) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setVerified(true);
                userRepository.save(user);

                Map<String, String> response = new HashMap<>();
                response.put("message", "OTP সফলভাবে ভেরিফাই হয়েছে!");
                return ResponseEntity.ok(response);
            }

            Map<String, String> error = new HashMap<>();
            error.put("message", "ইউজার পাওয়া যায়নি!");
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "ভেরিফিকেশন ব্যর্থ হয়েছে: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

            if (userOptional.isPresent() && userOptional.get().getPassword().equals(request.getPassword())) {
                User user = userOptional.get();
                Map<String, Object> response = new HashMap<>();
                response.put("token", "mock-jwt-token-for-" + user.getId());
                response.put("user", user);
                response.put("message", "লগইন সফল হয়েছে!");
                return ResponseEntity.ok(response);
            }

            Map<String, String> error = new HashMap<>();
            error.put("message", "ইমেইল অথবা পাসওয়ার্ড ভুল!");
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "লগইন ব্যর্থ হয়েছে: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}