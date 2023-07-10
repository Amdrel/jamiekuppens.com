#!/bin/bash
#
# vim: set expandtab:
# vim: set tabstop=4:
# vim: set shiftwidth=4:

# This script assumes to be ran as root.
if [ "$(id -u)" != "0" ]; then
    echo "This script must be run as root" 1>&2
    exit 1
fi

BLOG_TMPDIR="/tmp/jamiekuppens.com"
PUBLIC_DIR="$BLOG_TMPDIR/public"
NGINX_ROOT="/usr/share/nginx/jamiekuppens.com"

# Removes leftovers from /tmp.
cleanup() {
    rm -rf $BLOG_TMPDIR
}

# Check if bundle is passed and exists.
if [ -z "$1" ]; then
    echo "Please specify the bundle file" 1>&2
    exit 1
elif ! [ -e "$1" ]; then
    echo "File \"$1\" does not exist" 1>&2
    exit 1
fi

# Create extract directory in /tmp.
if ! mkdir $BLOG_TMPDIR; then
    echo "Unable to write to /tmp, check that /tmp is mounted properly" 1>&2
    exit 1
fi

# Extract the bundle to /tmp.
if ! tar -xvf $1 -C $BLOG_TMPDIR; then
    echo "Unable to extract bundle to $BLOG_TMPDIR" 1>&2
    cleanup
    exit 1
fi

# Validate the bundle to an extent. Checking for a public directory
# should be enough validation to prevent freak mistakes.
if ! [ -e $PUBLIC_DIR ]; then
    echo "Invalid bundle, no public directory" 1>&2
    cleanup
    exit 1
fi

rm -rf $NGINX_ROOT
cp -r $PUBLIC_DIR $NGINX_ROOT
cleanup
