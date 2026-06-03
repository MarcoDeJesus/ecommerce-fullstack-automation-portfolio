package com.b2b.ecommerce.service;

import com.b2b.ecommerce.dto.ProductRequest;
import com.b2b.ecommerce.dto.ProductResponse;
import com.b2b.ecommerce.entity.Product;
import com.b2b.ecommerce.exception.ResourceNotFoundException;
import com.b2b.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional
    public ProductResponse create(ProductRequest request) {
        Product product = Product.builder()
            .name(request.getName())
            .price(request.getPrice())
            .description(request.getDescription())
            .stock(request.getStock())
            .build();

        Product saved = productRepository.save(product);
        return ProductResponse.fromEntity(saved);
    }

    public List<ProductResponse> findAll() {
        return productRepository.findAll().stream()
            .map(ProductResponse::fromEntity)
            .toList();
    }

    public ProductResponse findById(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return ProductResponse.fromEntity(product);
    }

    @Transactional
    public ProductResponse update(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setStock(request.getStock());

        Product updated = productRepository.save(product);
        return ProductResponse.fromEntity(updated);
    }

    @Transactional
    public void delete(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        productRepository.delete(product);
    }
}
