package com.aura.habitude.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.aura.habitude.DTO.HabitDataRequestDto;
import com.aura.habitude.DTO.HabitDataResponseDto;
import com.aura.habitude.DTO.HabitRequestDto;
import com.aura.habitude.model.Habit;
import com.aura.habitude.model.HabitData;
import com.aura.habitude.repository.HabitDataRepository;
import com.aura.habitude.repository.HabitRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class HabitService {

    private final HabitDataRepository habitDataRepository;

    private final HabitRepository habitRepository;

    public void createHabit(HabitRequestDto habitRequest) {
        Habit habit = Habit.builder()
                .name(habitRequest.getName())
                .description(habitRequest.getDescription())
                .createdDate(habitRequest.getCreatedDate())
                .updatedDate(habitRequest.getUpdatedDate())
                .build();

        habitRepository.save(habit);
        log.info("Habit {} is saved", habit.getId());
    }

    public void createHabitData(HabitDataRequestDto habitDataRequest) {
        HabitData habitData = HabitData.builder()
                .habitId(habitDataRequest.getHabitId())
                .count(habitDataRequest.getCount())
                .date(habitDataRequest.getDate())
                .level(habitDataRequest.getLevel())
                .build();

        habitDataRepository.save(habitData);
        log.info("Habit Data {} is saved", habitData.getId());
    }

    public List<HabitDataResponseDto> getAllHabitData() {
        List<HabitData> habitData = habitDataRepository.findAll();

        return habitData.stream().map(this::mapToHabitDataResponse).toList();
    }

    private HabitDataResponseDto mapToHabitDataResponse(HabitData habitData) {
        return HabitDataResponseDto.builder()
                .habitId(habitData.getId())
                .count(habitData.getCount())
                .date(habitData.getDate())
                .level(habitData.getLevel())
                .build();
    }
}