package com.aura.pocketpatch.util;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.aura.pocketpatch.DTO.MonthlyStatementRequestDto;
import com.aura.pocketpatch.model.MonthlyStatement;
import com.aura.pocketpatch.service.PocketPatchService;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@Component
public class PocketPatchUtil implements ApplicationRunner {

    @Autowired
    GoogleApiUtil googleApiUtil;
    @Autowired
    PocketPatchService pocketPatchService;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {

        truncate();
        String[] years = new String[] { "2022", "2023" };
        String[] months = new String[] { "January", "February", "March", "April",
                "May", "June", "July",
                "August",
                "September", "October", "November", "December" };
        for (String year : years) {
            for (String month : months) {
                try {
                    MonthlyStatementRequestDto reqDto = new MonthlyStatementRequestDto(month, year, null, null);
                    List<MonthlyStatement> response = googleApiUtil.getDataFromGoogleSheet(reqDto);
                    pocketPatchService.saveAll(response);
                } catch (GoogleJsonResponseException e) {
                    // Handle the exception gracefully, e.g., log it
                    continue;
                    // e.printStackTrace(); // You can replace this with your preferred logging
                    // mechanism

                } catch (Exception e) {
                    // Handle the exception gracefully, e.g., log it
                    e.printStackTrace(); // You can replace this with your preferred logging mechanism
                }
            }
        }

    }

    private void truncate() {
        Query query = entityManager.createNativeQuery("SHOW TABLES");
        List<Object> tables = query.getResultList();

        for (Object table : tables) {
            String tableName = (String) table;
            if (!tableName.contains("seq")) {
                Query truncateQuery = entityManager.createNativeQuery("TRUNCATE TABLE " +
                        tableName);
                truncateQuery.executeUpdate();
            }

        }
    }
}