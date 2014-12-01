FROM ubuntu:14.04
MAINTAINER Arunan Rabindran <r.arunan@gmail.com>

RUN apt-get update && apt-get install -y \
	docker.io \
	haskell-platform \
	git \
	nodejs \
	npm

COPY . /docker

EXPOSE [9001 3000]

RUN cd /gcd; npm install; bower install
RUN cd /containerViz; npm install; bower install

CMD [./gcd/grunt]
CMD [./containerViz/grunt]
