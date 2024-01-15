package com.aura.habitude.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Activity {
    private String habitId;
    private int count;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private int level;
}