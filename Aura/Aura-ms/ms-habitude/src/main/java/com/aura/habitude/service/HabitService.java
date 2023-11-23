package com.aura.habitude.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.aura.habitude.DTO.HabitActivityResponseDto;
import com.aura.habitude.DTO.ActivityResponseDto;
import com.aura.habitude.DTO.HabitRequestDto;
import com.aura.habitude.DTO.HabitResponseDto;
import com.aura.habitude.model.Habit;
import com.aura.habitude.model.Activity;
import com.aura.habitude.repository.HabitRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class HabitService {

    private final HabitRepository habitRepository;

    public void createHabit(HabitRequestDto habitRequest) {
        Habit habit = Habit.builder()
                .name(habitRequest.getName())
                .description(habitRequest.getDescription())
                .createdDate(habitRequest.getCreatedDate())
                .updatedDate(habitRequest.getUpdatedDate())
                .build();

        int currentYear = LocalDateTime.now().getYear();

        Activity startOfYearActivity = new Activity();
        startOfYearActivity.setHabitId(habit.getId());
        startOfYearActivity.setCount(0);
        startOfYearActivity.setDate(getDate(currentYear, Calendar.JANUARY, 1));
        startOfYearActivity.setLevel(0);

        Activity endOfYearActivity = new Activity();
        endOfYearActivity.setHabitId(habit.getId());
        endOfYearActivity.setCount(0);
        endOfYearActivity.setDate(getDate(currentYear, Calendar.DECEMBER, 31));
        endOfYearActivity.setLevel(0);

        habit.setActivities(new ArrayList<>(List.of(startOfYearActivity, endOfYearActivity)));

        habitRepository.save(habit);
    }

    private Date getDate(int year, int month, int day) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month);
        calendar.set(Calendar.DAY_OF_MONTH, day);
        return calendar.getTime();
    }

    public Activity saveActivity(String habitId, Activity activity) {
        Optional<Habit> optionalHabit = habitRepository.findById(habitId);

        if (optionalHabit.isPresent()) {
            Habit habit = optionalHabit.get();

            if (habit.getActivities() == null) {
                habit.setActivities(new ArrayList<>());
            }
            habit.getActivities().add(activity);

            habitRepository.save(habit);

            return activity;
        } else {
            return null;
        }
    }

    public List<HabitActivityResponseDto> getAllActivities() {
        List<Habit> habits = habitRepository.findAll();

        return habits.stream()
                .map(this::mapToHabitActivityResponseDto)
                .collect(Collectors.toList());
    }

    public List<HabitResponseDto> getHabits() {
        List<Habit> habits = habitRepository.findAll();

        return habits.stream()
                .map(this::mapToHabitResponseDto)
                .collect(Collectors.toList());
    }

    private HabitActivityResponseDto mapToHabitActivityResponseDto(Habit habit) {
        List<ActivityResponseDto> activities = habit.getActivities().stream()
                .map(activity -> new ActivityResponseDto(activity.getCount(), activity.getDate(),
                        activity.getLevel()))
                .collect(Collectors.toList());

        return HabitActivityResponseDto.builder()
                .habitId(habit.getId())
                .habitName(habit.getName())
                .activities(activities)
                .build();
    }

    private HabitResponseDto mapToHabitResponseDto(Habit habit) {
        return HabitResponseDto.builder()
                .habitId(habit.getId())
                .name(habit.getName())
                .description(habit.getDescription())
                .build();
    }
}