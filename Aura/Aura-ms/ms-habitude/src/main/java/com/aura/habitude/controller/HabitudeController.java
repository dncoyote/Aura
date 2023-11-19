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

import com.aura.habitude.DTO.HabitDataRequestDto;
import com.aura.habitude.DTO.HabitDataResponseDto;
import com.aura.habitude.DTO.HabitRequestDto;
import com.aura.habitude.service.HabitService;

import org.springframework.http.HttpStatus;

import static com.aura.habitude.common.ApiEndpoints.API_PREFIX;
import static com.aura.habitude.common.ApiEndpoints.HABITS;;

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
    public void createHabitData(@RequestBody HabitDataRequestDto habitDataRequest) {
        habitService.createHabitData(habitDataRequest);
    }

    @GetMapping(HABITS)
    @ResponseStatus(HttpStatus.OK)
    public List<HabitDataResponseDto> getAllHabitData() {
        return habitService.getAllHabitData();
    }

}