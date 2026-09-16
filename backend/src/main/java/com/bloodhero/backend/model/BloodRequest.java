package com.bloodhero.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blood_requests")
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    private String requesterName;
    private String patientName;
    private String bloodGroup;
    private Integer bagsNeeded;
    private String hospitalName;
    private String district;
    private String contactNumber;

    @Column(columnDefinition = "TEXT")
    private String details;

    private String status; // PENDING, FULFILLED, CANCELLED
    private String urgency; // URGENT, NORMAL

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public BloodRequest() {}

    // --- GETTERS & SETTERS ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getRequesterName() { return requesterName; }
    public void setRequesterName(String requesterName) { this.requesterName = requesterName; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public Integer getBagsNeeded() { return bagsNeeded; }
    public void setBagsNeeded(Integer bagsNeeded) { this.bagsNeeded = bagsNeeded; }

    public String getHospitalName() { return hospitalName; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    // **এই দুটি মেথড অবশ্যই নিশ্চিত করুন:**
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}