
all:
	@echo Specify 'pull', 'config', 'install' or 'run'

pull:
	git pull

config:
	node ./scripts/install-config.js

install:
	npm install -g --unsafe-perm 

undo:
	git reset --hard HEAD

restart:
	pm2 restart homebridge

stop:
	pm2 stop homebridge

run:
	homebridge
