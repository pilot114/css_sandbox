build:
	docker build . -t base-sandbox
start:
	docker run --rm -d -v $(PWD)/app:/app -p 8080:8080 -p 8000:8000 --name sandbox base-sandbox
enter:
	docker exec -it -u workspace sandbox bash
stop:
	docker stop sandbox
