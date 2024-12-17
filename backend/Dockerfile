# Use the official Python image
FROM python:3.12

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    build-essential \
    pkg-config \
    && apt-get clean

# Set working directory
WORKDIR /app

# Copy app code
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8081

# Run the app
CMD ["python", "app.py"]
