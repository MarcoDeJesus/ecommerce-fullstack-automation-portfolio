.PHONY: install dev docker-up docker-down build test test-api test-e2e test-postman

install:
	mvn -f backend dependency:resolve -q
	cd frontend && npm install
	cd tests/playwright && npm install
	cd tests/api && npm install
	cd tests/postman && npm install

dev:
	docker compose up postgres -d
	@echo "Starting backend and frontend in parallel..."
	@(cd backend && mvn spring-boot:run) & \
	(cd frontend && npm run dev) & \
	wait

docker-up:
	docker compose up --build -d

docker-down:
	docker compose down

build:
	mvn -f backend package -DskipTests -q
	cd frontend && npm run build

test: test-api test-postman test-e2e

test-api:
	cd tests/api && npm test

test-e2e:
	cd tests/playwright && npx playwright test

test-postman:
	cd tests/postman && npm test
