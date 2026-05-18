package com.kwonjunbeom.bookmanagementapi.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookRequestDto {

    @NotBlank(message = "도서명은 반드시 입력되어야 합니다.")
    private String title;

    @NotBlank(message = "저자는 반드시 입력되어야 합니다.")
    private String author;

    @NotNull(message = "가격이 입력되지 않았습니다.")
    @Min(value = 0, message = "가격은 0원 이상이어야 합니다.")
    private Integer price;

    @Min(value = 1, message = "출판연도는 최소 1년입니다.")
    private Integer publishYear;

    private Boolean available;
}
