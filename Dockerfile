# Use a lightweight base image with a web server (e.g., Nginx)
FROM nginx:alpine

# Copy HTML, JavaScript, and CSS files from the respective directories
COPY src/ /usr/share/nginx/html

# Expose the default HTTP port (80)
EXPOSE 80

# Start the web server when the container runs
CMD ["nginx", "-g", "daemon off;"]
