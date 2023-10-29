package com.aura.pocketpatch.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.text.ParseException;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aura.pocketpatch.DTO.MonthlyStatementRequestDto;
import com.aura.pocketpatch.model.MonthlyStatement;
import com.aura.pocketpatch.util.GoogleApiUtil;

@Service
public class GoogleApiService {

    @Autowired
    private GoogleApiUtil googleApiUtil;

    public List<MonthlyStatement> getMonthlyStatementFromGoogleSheet(MonthlyStatementRequestDto reqDto)
            throws GeneralSecurityException, IOException, NumberFormatException, ParseException {
        try {
            return googleApiUtil.getDataFromGoogleSheet(reqDto);
        } catch (IOException | GeneralSecurityException | NumberFormatException | ParseException e) {
            throw e;
        }
    }

    public List<MonthlyStatement> sortMonthlyStatement(List<MonthlyStatement> expenses, String sortBy,
            String sortOrder) {

        Comparator<MonthlyStatement> comparator = null;

        switch (sortBy.toLowerCase()) {
            case "category":
                comparator = Comparator.comparing(MonthlyStatement::getCategory);
                break;
            case "type":
                comparator = Comparator.comparing(MonthlyStatement::getType);
                break;
            case "amount":
                comparator = Comparator.comparing(MonthlyStatement::getAmount);
                break;
            case "date":
                comparator = Comparator.comparing(MonthlyStatement::getDate);
                break;
            default:
                comparator = Comparator.comparing(MonthlyStatement::getDate);
                break;
        }

        if (sortOrder.equalsIgnoreCase("desc")) {
            comparator.reversed();
        }
        Collections.sort(expenses, comparator);
        return expenses;
    }
}