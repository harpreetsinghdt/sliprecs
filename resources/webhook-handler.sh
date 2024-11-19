#!/bin/bash

LOGFILE="/var/www/sliprecs/webhook-handler.log"

# Log the start time
echo "$(date) - Starting webhook deployment..." >> "$LOGFILE"

# Change to your project directory
cd /var/www/sliprecs/  # Adjust if necessary

# Ensure no local changes, reset and pull the latest code
git reset --hard
git pull origin main  # Replace with the appropriate branch name

# Install dependencies (if needed)
cd /var/www/sliprecs/frontend  # Go to frontend directory
npm install               # Install frontend dependencies

# Build the frontend
npm run build

# Copy the build to the Nginx served directory (if applicable)
cp -r /var/www/sliprecs/frontend/dist/* /var/www/html/

# Restart backend server (Flask in this case)
# If using PM2 to manage the Flask app, restart the app
pm2 restart sliprecs-backend  # Adjust with the correct PM2 app name if using PM2


# Log the completion
echo "$(date) - Webhook deployment completed successfully" >> "$LOGFILE"