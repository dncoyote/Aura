package com.aura.pocketpatch.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aura.pocketpatch.DTO.MonthlyStatementRequestDto;
import com.aura.pocketpatch.DTO.MonthlyStatementResponseDto;
import com.aura.pocketpatch.common.PocketPatchConstants;
import com.aura.pocketpatch.common.PocketPatchException;
import com.aura.pocketpatch.common.Response;
import com.aura.pocketpatch.model.MonthlyStatement;
import com.aura.pocketpatch.service.ExpenseCalculatorService;
import com.aura.pocketpatch.service.PocketPatchService;

import static com.aura.pocketpatch.common.ApiEndpoints.API_PREFIX;
import static com.aura.pocketpatch.common.ApiEndpoints.MONTHLY_STATEMENT;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(API_PREFIX)
public class PocketPatchController {

    @Autowired
    private PocketPatchService pocketPatchService;

    @GetMapping("/products")
    public List<MonthlyStatement> findAllProducts() {
        return pocketPatchService.getMonthlyStatements();
    }

    @GetMapping(MONTHLY_STATEMENT)
    public ResponseEntity<Response<List<MonthlyStatementResponseDto>>> getMonthlyStatementFromGoogleSheet(
            @ModelAttribute MonthlyStatementRequestDto reqDto)
            throws GeneralSecurityException, IOException, NumberFormatException, ParseException {
        try {
            List<MonthlyStatement> expenses = pocketPatchService.getStatements(reqDto);
            List<MonthlyStatementResponseDto> responseList = new ArrayList<>();
            if (expenses == null || expenses.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new Response<>(PocketPatchConstants.ERROR_MESSAGE, null, 400));
            } else {
                MonthlyStatementResponseDto response = new MonthlyStatementResponseDto(expenses,
                        ExpenseCalculatorService.calculateSalary(expenses),
                        ExpenseCalculatorService.calculateDebitSum(expenses),
                        ExpenseCalculatorService.calculateCreditSum(expenses),
                        ExpenseCalculatorService.calculateBalance(expenses));
                responseList.add(response);
                responseList.isEmpty();
                return ResponseEntity
                        .ok(new Response<List<MonthlyStatementResponseDto>>(PocketPatchConstants.SUCCESS_MESSAGE,
                                responseList, 0));
            }

        } catch (PocketPatchException e) {
            // Handle custom application-specific exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response<>("Error: " + "NO data", null, 400));
        } catch (Exception e) {
            // Handle unexpected exceptions
            return ResponseEntity.badRequest()
                    .body(new Response<>(PocketPatchConstants.ERROR_MESSAGE, null, 400));
        }
    }

    @GetMapping("/check")
    public String check() {
        return "hello";
    }

}