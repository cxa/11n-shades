.PHONY: dev

lrs:
	curl -O https://raw.githubusercontent.com/cxa/live-reload-server/main/lrs
	chmod +x lrs

dev: lrs
	./lrs
