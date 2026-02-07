# Builder stage
FROM python:3.11-slim AS builder
WORKDIR /app

# Install build dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies into /app/deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt --target /app/deps

# Production stage
FROM python:3.11-slim
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends libpq5 && \
    rm -rf /var/lib/apt/lists/*

# Copy dependencies from builder
COPY --from=builder /app/deps /app/deps
ENV PYTHONPATH=/app/deps

# Copy application code
COPY . .

# Create non-root user and set ownership
RUN useradd -m -u 1000 appuser && \
    chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Optional: Healthcheck (make sure requests is in requirements.txt)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8000/', timeout=2)"

# Run the app
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
