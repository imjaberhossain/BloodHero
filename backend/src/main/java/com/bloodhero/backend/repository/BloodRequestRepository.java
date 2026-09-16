package com.bloodhero.backend.repository;

import com.bloodhero.backend.model.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {
    List<BloodRequest> findAllByOrderByCreatedAtDesc();
    List<BloodRequest> findByBloodGroupOrderByCreatedAtDesc(String bloodGroup);
}