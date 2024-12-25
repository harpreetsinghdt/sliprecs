webhook_handler.html
#!/bin/bash

# Explicitly set the necessary environment variables if needed
export PATH=$PATH:/usr/local/bin   # Adjust this if needed based on your system
export NODE_ENV=production        # Example for Node.js apps, if necessary

LOGFILE="/var/www/sliprecs/webhook-handler.log"

# Log the start time
echo "$(date) - Starting webhook deployment..." >> "$LOGFILE"

# Change to your project directory
cd /var/www/sliprecs || { echo "$(date) - Failed to cd into /var/www/sliprecs" >> "$LOGFILE"; exit 1; }

# Ensure no local changes, reset and pull the latest code
git fetch origin main >> "$LOGFILE" 2>&1 || { echo "$(date) - Git fetch failed" >> "$LOGFILE"; exit 1; }
git reset --hard origin/main >> "$LOGFILE" 2>&1 || { echo "$(date) - Git reset failed" >> "$LOGFILE"; exit 1; }

# Install frontend dependencies
cd /var/www/sliprecs/frontend || { echo "$(date) - Failed to cd into frontend" >> "$LOGFILE"; exit 1; }
npm install >> "$LOGFILE" 2>&1 || { echo "$(date) - NPM install failed" >> "$LOGFILE"; exit 1; }

# Build the frontend
npm run build >> "$LOGFILE" 2>&1 || { echo "$(date) - NPM build failed" >> "$LOGFILE"; exit 1; }

# Copy the build to the Nginx served directory
rsync -av --delete /var/www/sliprecs/frontend/dist/ /var/www/html/ >> "$LOGFILE" 2>&1 || { echo "$(date) - Rsync failed" >> "$LOGFILE"; exit 1; }

# Restart backend server (Flask)
pm2 restart webhook-flask >> "$LOGFILE" 2>&1 || { echo "$(date) - PM2 restart failed" >> "$LOGFILE"; exit 1; }

# Log the completion
echo "$(date) - Webhook deployment completed successfully" >> "$LOGFILE"
