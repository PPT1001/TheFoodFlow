# Use a lightweight base image with a web server (e.g., Nginx)
FROM nginx:alpine

# Remove the default Nginx default configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy your HTML, JavaScript, and CSS files into the container
COPY ./src /usr/share/nginx/html

# Expose the default HTTP port (80)
EXPOSE 80

# Start the Nginx web server in the foreground
CMD ["nginx", "-g", "daemon off;"]
