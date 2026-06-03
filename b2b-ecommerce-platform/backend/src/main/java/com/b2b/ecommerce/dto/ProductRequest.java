package com.b2b.ecommerce.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest {

    @NotNull
    private String name;

    @NotNull
    @Positive
    private BigDecimal price;

    private String description;

    @NotNull
    @Positive
    private Integer stock;
}
