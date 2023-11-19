package com.aura.habitude.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.aura.habitude.model.Habit;

public interface HabitRepository extends MongoRepository<Habit, String> {

}