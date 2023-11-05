package com.aura.pocketpatch.service;

import java.util.List;

import com.aura.pocketpatch.model.MonthlyStatement;

public class ExpenseCalculatorService {
    public static double calculateDebitSum(List<MonthlyStatement> expenses) {
        return expenses.stream()
                .filter(expense -> "DEBIT".equals(expense.getType()))
                .mapToDouble(MonthlyStatement::getAmount)
                .sum();
    }

    public static double calculateCreditSum(List<MonthlyStatement> expenses) {
        return expenses.stream()
                .filter(expense -> "CREDIT".equals(expense.getType()))
                .mapToDouble(MonthlyStatement::getAmount)
                .sum();
    }

    public static double calculateSalary(List<MonthlyStatement> expenses) {
        return expenses.stream()
                .filter(expense -> "SALARY".equals(expense.getType()))
                .mapToDouble(MonthlyStatement::getAmount)
                .sum();
    }

    public static double calculateBalance(List<MonthlyStatement> expenses) {
        double debitSum = calculateDebitSum(expenses);
        double salarySum = calculateSalary(expenses);
        double creditSum = calculateCreditSum(expenses);
        return salarySum - debitSum + creditSum;
    }
}