FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY ./frontend-latest/package*.json .
RUN npm install

COPY ./frontend-latest/public ./public
COPY ./frontend-latest/src ./src
RUN npm run build

FROM python:3.11-slim
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app
COPY backend-fastapi/pyproject.toml ./
RUN uv sync

COPY backend-fastapi/src ./src
COPY --from=frontend-builder /app/frontend/build ./src/app/static

RUN uv pip install -e .
CMD ["uv" "run" "src/app/main.py"]
