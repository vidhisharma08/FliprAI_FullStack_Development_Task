# ---------- Build Stage ----------
# Use Maven + JDK 17 to build the Spring Boot jar
FROM maven:3.9-eclipse-temurin-17 AS build

# Set working directory inside the container
WORKDIR /app

# Copy pom.xml and download dependencies (layer cache)
COPY pom.xml .
RUN mvn -q dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn -q -DskipTests package

# ---------- Runtime Stage ----------
# Small image with only JRE 17
FROM eclipse-temurin:17-jre-alpine

# Working directory for the app
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose default port (Render will still inject PORT env variable)
EXPOSE 8080

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
