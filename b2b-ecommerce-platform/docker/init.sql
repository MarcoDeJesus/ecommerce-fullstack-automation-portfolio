CREATE TABLE IF NOT EXISTS products (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    price       NUMERIC(10, 2) NOT NULL,
    description TEXT,
    stock       INTEGER NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO products (name, price, description, stock, created_at) VALUES
    ('Industrial Widget', 49.99, 'Heavy-duty widget for B2B orders', 500, NOW()),
    ('Premium Cable', 12.50, 'Bulk cable pack (100m)', 200, NOW()),
    ('Office Chair Pro', 299.00, 'Ergonomic chair for corporate buyers', 75, NOW());
