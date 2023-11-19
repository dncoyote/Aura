package com.aura.habitude.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.aura.habitude.model.HabitData;

public interface HabitDataRepository extends MongoRepository<HabitData, String> {
}