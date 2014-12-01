# Use Ubuntu 14.04 base image
FROM ubuntu:14.04
MAINTAINER Arunan Rabindran <r.arunan@gmail.com>

# Install dependencies for dev environment required for projects
RUN apt-get update && apt-get install -y \
	docker.io \
	haskell-platform \
	libncurses5-dev \
	git \
	nodejs \
	npm

# Copy Source to /docker Destination folder
COPY . /docker

# Expose ports: 9001 and 3000 for the servers
# EXPOSE [9001 3000]

# Download dependent libraries to environment
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN cabal update ; cabal install cabal-install ; cabal install purescript
RUN npm install -g bower ; npm install -g grunt ; npm install -g grunt-cli
RUN cd /docker/gcd ; npm install ; bower install --allow-root
RUN cd /docker/containerViz ; npm install ; bower install --allow-root

# To run programs: Please start container in /bin/bash -t -i mode and cd into /docker
# For both `gcd` & `containerViz` do: `grunt`
