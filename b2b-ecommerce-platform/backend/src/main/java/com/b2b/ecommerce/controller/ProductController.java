package com.b2b.ecommerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    // TODO: Implementar catálogo B2B con precios por cliente, stock y pedido mínimo

    @GetMapping("/products")
    public ResponseEntity<List<Object>> getProducts() {
        return ResponseEntity.ok(Collections.emptyList());
    }
}
