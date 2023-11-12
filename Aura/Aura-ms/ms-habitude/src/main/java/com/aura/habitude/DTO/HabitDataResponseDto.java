package com.aura.habitude.DTO;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HabitDataResponseDto {
    private String id;
    private String habitId;
    private int count;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private int level;
}