package com.bloodhero.backend.controller;

import com.bloodhero.backend.model.BloodRequest;
import com.bloodhero.backend.repository.BloodRequestRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blood-requests")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class BloodRequestController {

    private final BloodRequestRepository repository;

    public BloodRequestController(BloodRequestRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<BloodRequest>> getAllRequests(@RequestParam(required = false) String bloodGroup) {
        if (bloodGroup != null && !bloodGroup.isEmpty() && !bloodGroup.equalsIgnoreCase("ALL")) {
            return ResponseEntity.ok(repository.findByBloodGroupOrderByCreatedAtDesc(bloodGroup));
        }
        return ResponseEntity.ok(repository.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping
    public ResponseEntity<BloodRequest> createRequest(@RequestBody BloodRequest request) {
        if (request.getStatus() == null) {
            request.setStatus("PENDING");
        }
        return ResponseEntity.ok(repository.save(request));
    }
}