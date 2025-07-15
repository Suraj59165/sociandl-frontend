#!/bin/bash

# Exit immediately if any command fails
set -e

# Output a message indicating the process has started
echo "🔄 Fetching latest changes from sandbox branch..."

# Pull the latest changes from the sandbox branch. If it fails, exit the script with an error message
git pull origin sandbox --no-ff --no-edit || { echo "❌ Git pull failed! Exiting..."; exit 1; }

# Build the Angular project
echo "🔧 Building Angular project..."
ng build || { echo "❌ Build failed! Exiting..."; exit 1; }

# Copy the built files to the Nginx directory
echo "📂 Copying built files to /var/www/html..."
cp -r dist/paablock-frontend/browser /var/www/html || { echo "❌ Copy failed! Exiting..."; exit 1; }

# Restart the Nginx service to apply changes
echo "🔄 Restarting Nginx..."
sudo systemctl restart nginx || { echo "❌ Nginx restart failed! Exiting..."; exit 1; }

# Output a success message with the app's URL
echo "✅ Deployment complete! Visit https://global.paacryptobank.com to see your app."
