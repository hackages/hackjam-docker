# Traefik - Netshare

Traefik is a reverse proxy and loadbalancer.

<https://docs.traefik.io/>

## Requierment

To play with traefik, you'll need 3 machines running docker, if you have done the exo4, this should already be the case.

If not, there is a vagrantfile in the exo4 folder.

### 1) simple traefik example

For the exercice on traefik, you'll try to deploy one docker image accross your environment and access it via an url.

Since we don't have a DNS, you should use the hostfile to point on the manager or the command curl.

You can use this simple http image : nginxdemos/hello

hint :

``` bash
curl -H Host:website1.hackages.local http://192.168.0.1
```

You can access the traefik dashboard on the port 8080.

### 2) Bonus try to replace NGINX

Now you should be able to deploy the app you made on the exo 4 but with some constraint.

Let's say the node0 will be your loadbalancer, meaning everything should pass via 10.1.1.2

Then node1 could only hosts the webapp , node2 mongodb and finally node3 will only be storing redis.

Have a look at this document from Docker:

<https://success.docker.com/article/using-contraints-and-labels-to-control-the-placement-of-containers>
