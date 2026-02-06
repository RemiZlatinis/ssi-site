#!/bin/bash

# Save current directory to return to later
ORIGINAL_DIR=$(pwd)

TEMP_DIR=~/.temp-ssi-agent-installation

# Warn the user for sudo usage
echo "WARNING: The installer needs to use 'sudo' to create the 'ssi-agent' user"

# Start fresh
rm -rf "$TEMP_DIR" &> /dev/null

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "ERROR: git is not installed. Please install git and try again."
    exit 1
fi

# Clone from the source
if ! git clone https://github.com/remizlatinis/ssi-agent.git "$TEMP_DIR"; then
    echo "ERROR: Failed to clone repository"
    exit 1
fi

# Install from source
cd "$TEMP_DIR"
sudo "./install.sh"
# If you are looking for the installer:
# https://github.com/RemiZlatinis/ssi-agent/blob/main/install.sh

# Return to original directory before cleanup
cd "$ORIGINAL_DIR"

# Clean up
sudo rm -rf "$TEMP_DIR" # sudo because we need to also delete files created from the 'ssi-agent' user
