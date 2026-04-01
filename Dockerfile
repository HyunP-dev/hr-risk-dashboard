FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY ./frontend/package*.json .
RUN npm install

COPY ./frontend/public ./public
COPY ./frontend/src ./src
COPY ./frontend/index.html ./index.html
RUN npm run build

FROM python:3.12-slim
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app
COPY backend/pyproject.toml ./
COPY backend/.python-version ./
RUN uv sync

COPY backend/src ./src
COPY --from=frontend-builder /app/frontend/dist ./src/app/static

RUN uv pip install -e .
CMD ["uv", "run", "src/app/main.py"]
