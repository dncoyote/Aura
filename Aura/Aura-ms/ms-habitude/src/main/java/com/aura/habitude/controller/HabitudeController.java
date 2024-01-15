package com.aura.habitude.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.aura.habitude.DTO.HabitActivityResponseDto;
import com.aura.habitude.DTO.ActivityRequestDto;
import com.aura.habitude.DTO.HabitRequestDto;
import com.aura.habitude.DTO.HabitResponseDto;
import com.aura.habitude.model.Activity;
import com.aura.habitude.service.HabitService;

import org.springframework.http.HttpStatus;

import static com.aura.habitude.common.ApiEndpoints.API_PREFIX;
import static com.aura.habitude.common.ApiEndpoints.ACTIVITIES;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(API_PREFIX)
public class HabitudeController {
    @Autowired
    private HabitService habitService;

    @PostMapping("/habittracker/sethabit")
    @ResponseStatus(HttpStatus.CREATED)
    public void createHabit(@RequestBody HabitRequestDto habitRequest) {
        habitService.createHabit(habitRequest);
    }

    @PostMapping("/habittracker/habitdata")
    @ResponseStatus(HttpStatus.CREATED)
    public void createHabitData(@RequestBody ActivityRequestDto habitDataRequest) {
        Activity activity = new Activity(habitDataRequest.getHabitId(), habitDataRequest.getCount(),
                habitDataRequest.getDate(), habitDataRequest.getLevel());

        habitService.saveActivity(habitDataRequest.getHabitId(), activity);
    }

    @GetMapping("/habit")
    @ResponseStatus(HttpStatus.OK)
    public List<HabitResponseDto> getHabits() {
        return habitService.getHabits();
    }

    @GetMapping(ACTIVITIES)
    @ResponseStatus(HttpStatus.OK)
    public List<HabitActivityResponseDto> getAllActivities() {
        return habitService.getAllActivities();
    }

}