package com.aura.habitude.model;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value = "habitData")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class HabitData {

    @Id
    private String id;

    private String habitId;
    private int count;
    private Date date;
    private int level;
}