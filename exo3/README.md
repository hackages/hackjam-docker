# Hands on Docker compose
## Docker compose exercices

### 1) Deploy wordpress and mysql database

Based on the official docker wordpress image https://hub.docker.com/_/wordpress/, try to use docker compose to deploy it. 

Hint, those environment variables will be needed :

```
MYSQL_ROOT_PASSWORD: somewordpress
MYSQL_DATABASE: wordpress
MYSQL_USER: wordpress
MYSQL_PASSWORD: wordpress

WORDPRESS_DB_HOST: db:3306
WORDPRESS_DB_USER: wordpress
WORDPRESS_DB_PASSWORD: wordpress
```

### 2) Building a nodejs application

Based on the nodejs files, try to build an app using redis, mongodb and nginx as loadbalancer.

The nginx configuration is already done.

Please, try to follow the below schema :

Tips, you can create a dockerfile per container.

While running the application should be like this :

![node](https://github.com/hackages/hackday_introduction_docker_kubernetes/raw/master/exo3/images/node.PNG)

### 3) Building a python/flask application

Based on the python files (especially app.py), try to build an app using redis, mongodb and nginx as loadbalancer.

The nginx configuration is already done.

Please, try to follow the below schema :

Tips, you can create a dockerfile per container.

When it's running the application should be like this :

![flask](/exo3/images/flask.PNG)
