package com.bloodhero.backend.repository;

import com.bloodhero.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    List<User> findByBloodGroupAndDistrict(String bloodGroup, String district);
    List<User> findByBloodGroup(String bloodGroup);
    List<User> findByDistrict(String district);

    // PostGIS Distance Query (মিটারে দূরত্ব হিসাব করে কিমিতে ফিল্টার করে)
    @Query(value = "SELECT * FROM users u " +
            "WHERE u.latitude IS NOT NULL AND u.longitude IS NOT NULL " +
            "AND (:bloodGroup IS NULL OR :bloodGroup = '' OR u.blood_group = :bloodGroup) " +
            "AND ST_DistanceSphere(ST_SetSRID(ST_MakePoint(u.longitude, u.latitude), 4326), " +
            "                      ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)) <= (:radiusInKm * 1000) " +
            "ORDER BY ST_DistanceSphere(ST_SetSRID(ST_MakePoint(u.longitude, u.latitude), 4326), " +
            "                           ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)) ASC", nativeQuery = true)
    List<User> findNearbyDonors(
            @Param("lat") Double lat,
            @Param("lng") Double lng,
            @Param("radiusInKm") Double radiusInKm,
            @Param("bloodGroup") String bloodGroup
    );
}