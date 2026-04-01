# README

## Usage

```shell
podman run --name hr-risk-mysql -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_DATABASE=hr_risk_db -p 127.0.0.1:3306:3306 -d mysql:latest
mysql -u root -p hr_risk_mysql < scripts/init.sql

uv sync
uv run --env-file src/app/.env scripts/init_data.py
uv run src/app/main.py
```
