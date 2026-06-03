.PHONY: install dev up down logs build docker-up docker-down test test-api test-e2e test-postman test-allure allure-report allure-open

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

up:
	@test -f .env || (echo "Copy .env.example to .env first" && exit 1)
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f

build:
	docker compose build

docker-up: up

docker-down: down

test: test-api test-postman test-e2e

test-api:
	cd tests/api && npm test

test-e2e:
	cd tests/playwright && npx playwright test

test-postman:
	cd tests/postman && npm test

test-allure: test-api-allure test-postman-allure test-e2e-allure test-backend-allure

test-backend-allure:
	mvn -f backend -B test

test-api-allure:
	cd tests/api && npm run test:allure

test-postman-allure:
	cd tests/postman && npm test

test-e2e-allure:
	cd tests/playwright && npm run test:allure

allure-report:
	allure generate backend/target/allure-results tests/api/allure-results \
		tests/playwright/allure-results tests/postman/allure-results \
		-o allure-report --clean

allure-open:
	allure open allure-report
