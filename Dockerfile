# Use Ubuntu 14.04 base image
FROM ubuntu:14.04
MAINTAINER Arunan Rabindran <r.arunan@gmail.com>

# Install dependencies for dev environment required for projects
RUN apt-get update && apt-get install -y \
	docker.io \
	haskell-platform \
	git \
	nodejs \
	npm

# Copy Source to /docker Destination folder
COPY . /docker

# Expose ports: 9001 and 3000 for the servers
EXPOSE [9001 3000]

# Download dependent libraries to environment
RUN cd /gcd; npm install; bower install
RUN cd /containerViz; npm install; bower install

# Run the programs
CMD [./gcd/grunt]
CMD [./containerViz/grunt]
