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
public class HabitRequestDto {
    private String name;
    private String description;
    private Date createdDate;
    private Date updatedDate;
}