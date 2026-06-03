package com.b2b.ecommerce.dto;

import com.b2b.ecommerce.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;
    private String name;
    private BigDecimal price;
    private String description;
    private Integer stock;
    private LocalDateTime createdAt;

    public static ProductResponse fromEntity(Product product) {
        return ProductResponse.builder()
            .id(product.getId())
            .name(product.getName())
            .price(product.getPrice())
            .description(product.getDescription())
            .stock(product.getStock())
            .createdAt(product.getCreatedAt())
            .build();
    }
}
