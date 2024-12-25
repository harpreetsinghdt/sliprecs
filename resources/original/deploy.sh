#!/bin/bash

# Stop script execution on any command failure
set -e

export HOME=/var/www
export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin

LOGFILE="/var/www/sliprecs/deploy.log"

log() {
  echo "$(date) - $1" >> "$LOGFILE"
}

log "Starting webhook deployment..."

# Change to project directory
cd /var/www/sliprecs/
log "Changed to project directory"

# Reset and pull latest changes
git reset --hard || { log "Git reset failed"; exit 1; }
log "Git reset completed"

git pull origin main || { log "Git pull failed"; exit 1; }
log "Git pull completed"

# FRONTEND TASKS
log "Starting frontend deployment tasks..."
cd /var/www/sliprecs/frontend || { log "Frontend directory not found"; exit 1; }
#npm install || { log "Frontend npm install failed"; exit 1; }
npm install --verbose || { log "Frontend npm install failed"; exit 1; }
log "Frontend dependencies installed"

npm run build || { log "Frontend build failed"; exit 1; }
log "Frontend build completed"

# Uncomment and modify this line if Nginx serves static files
# cp -r dist/* /var/www/html/ || { log "Failed to copy frontend build to Nginx directory"; exit 1; }
# log "Frontend build copied to Nginx directory"

# BACKEND TASKS
log "Starting backend deployment tasks..."
cd /var/www/sliprecs/backend || { log "Backend directory not found"; exit 1; }
npm install || { log "Backend npm install failed"; exit 1; }
log "Backend dependencies installed"

pm2 restart sliprecs-backend || { log "PM2 restart failed"; exit 1; }
log "Backend server restarted"

log "Webhook deployment completed successfully"
