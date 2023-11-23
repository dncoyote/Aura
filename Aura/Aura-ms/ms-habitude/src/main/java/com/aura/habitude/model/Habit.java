package com.aura.habitude.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value = "habit")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Habit {

    @Id
    private String id;
    private String name;
    private String description;
    private Date createdDate;
    private Date updatedDate;
    @Field("activities")
    private List<Activity> activities;
}