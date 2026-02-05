# Use a lightweight Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your code
COPY . .

# Expose the port your app runs on (usually 8000 or 5000)
EXPOSE 8000

# Command to run your app (replace with your start command)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "main:app"]