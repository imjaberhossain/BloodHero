package com.bloodhero.backend.controller;

import com.bloodhero.backend.model.User;
import com.bloodhero.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ১. ID দিয়ে ইউজার প্রোফাইল ডাটা গেট করা
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    // ২. প্রোফাইল আপডেট করা
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable Long id, @RequestBody User userDetails) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (userDetails.getName() != null) user.setName(userDetails.getName());
            if (userDetails.getPhone() != null) user.setPhone(userDetails.getPhone());
            if (userDetails.getBloodGroup() != null) user.setBloodGroup(userDetails.getBloodGroup());
            if (userDetails.getDistrict() != null) user.setDistrict(userDetails.getDistrict());
            user.setIsAvailable(userDetails.getIsAvailable());

            User updatedUser = userRepository.save(user);
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }

    // ৩. ডোনার ফিল্টার করে সার্চ করা
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchDonors(
            @RequestParam(required = false) String bloodGroup,
            @RequestParam(required = false) String district) {

        if ((bloodGroup == null || bloodGroup.isEmpty()) && (district == null || district.isEmpty())) {
            return ResponseEntity.ok(userRepository.findAll());
        } else if (bloodGroup != null && !bloodGroup.isEmpty() && (district == null || district.isEmpty())) {
            return ResponseEntity.ok(userRepository.findByBloodGroup(bloodGroup));
        } else if ((bloodGroup == null || bloodGroup.isEmpty()) && district != null && !district.isEmpty()) {
            return ResponseEntity.ok(userRepository.findByDistrict(district));
        } else {
            return ResponseEntity.ok(userRepository.findByBloodGroupAndDistrict(bloodGroup, district));
        }
    }
}