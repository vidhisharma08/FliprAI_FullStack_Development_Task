# ---------- Build stage ----------
# Maven + JDK 17 image to build the Spring Boot jar
FROM maven:3.9-eclipse-temurin-17 AS build

# Work directory inside container (build stage)
WORKDIR /build

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn -B dependency:go-offline

# Copy source code and build the project
COPY src ./src
RUN mvn -B clean package -DskipTests

# ---------- Runtime stage ----------
# Lightweight JRE 17 image to run the app
FROM eclipse-temurin:17-jre-alpine

# Work directory for running app
WORKDIR /app

# Copy the built jar from the build stage and name it app.jar
COPY --from=build /build/target/*.jar app.jar

# Expose port (Render will inject PORT env)
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
