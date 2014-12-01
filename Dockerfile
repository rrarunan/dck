FROM ubuntu:14.04
MAINTAINER Arunan Rabindran <r.arunan@gmail.com>

RUN apt-get update && apt-get install -y \
	haskell-platform \
	git \
	nodejs \
	npm
