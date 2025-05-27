FROM python:3.11-slim

WORKDIR /app

# Installe uv
RUN pip install uv

# Copie les fichiers de dépendances et installe avec uv
COPY pyproject.toml uv.lock ./
RUN uv pip install --system .

# Copie le reste du code
COPY . .

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 