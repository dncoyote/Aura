package com.aura.habitude.DTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HabitActivityResponseDto {
    private String habitId;
    private String habitName;
    private List<ActivityResponseDto> activities;
}