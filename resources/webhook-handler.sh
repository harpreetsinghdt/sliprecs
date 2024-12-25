#!/bin/bash

export HOME=/var/www
export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin
#export PATH=$PATH:/usr/bin


LOGFILE="/var/www/sliprecs/webhook-handler.log"

# Log the start time
echo "$(date) - Starting webhook deployment... 0" >> "$LOGFILE"

# Change to your project directory
cd /var/www/sliprecs/  # Adjust if necessary
echo "$(date) - Webhook deployment completed successfully 1" >> "$LOGFILE"

# Ensure no local changes, reset and pull the latest code
git reset --hard

echo "$(date) - Webhook deployment completed successfully 2" >> "$LOGFILE"

git pull origin main

echo "$(date) - Webhook deployment completed successfully 3" >> "$LOGFILE"

# Install dependencies (if needed)

cd /var/www/sliprecs/frontend  # Go to frontend directory

echo "$(date) - Webhook deployment completed successfully 4" >> "$LOGFILE"

npm install         # Install frontend dependencies

echo "$(date) - Webhook deployment completed successfully 5" >> "$LOGFILE"

# Build the frontend
npm run build

echo "$(date) - Webhook deployment completed successfully 6" >> "$LOGFILE"

# Copy the build to the Nginx served directory (if applicable)
#cp -r /var/www/sliprecs/frontend/dist/* /var/www/html/
#echo "$(date) - Webhook deployment completed successfully 7" >> "$LOGFILE"

# Install dependencies (if needed)
cd /var/www/sliprecs/backend # Go to backend directory

echo "$(date) - Webhook deployment completed successfully 8" >> "$LOGFILE"

npm install

echo "$(date) - Webhook deployment completed successfully 9" >> "$LOGFILE"

# Restart backend server (Flask in this case)
# If using PM2 to manage the Flask app, restart the app

pm2 restart sliprecs-backend  # Adjust with the correct PM2 app name if using PM2

#NODE_ENV=production pm2 restart sliprecs-backend

# Log the completion
echo "$(date) - Webhook deployment completed successfully 10" >> "$LOGFILE"