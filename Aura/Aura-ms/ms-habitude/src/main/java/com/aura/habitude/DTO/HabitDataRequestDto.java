package com.aura.habitude.DTO;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HabitDataRequestDto {
    private String habitId;
    private int count;
    private Date date;
    private int level;
}