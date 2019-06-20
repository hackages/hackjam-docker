# Traefik - Netshare

Traefik is a reverse proxy and loadbalancer.

<https://docs.traefik.io/>

## Requierment

To play with traefik, you'll need 3 machines running docker, if you have done the exo4, this should already be the case.

If not, there is a vagrantfile in the exo4 folder.

### 1) Traefik

For the exercice on traefik, you'll try to deploy one docker image accross your environment and access it via an url.

Since we don't have a DNS, you should use the hostfile to point on the manager or the command curl.

hint :

``` bash
curl -H Host:website1.hackages.local http://192.168.0.1
```

You can access the traefik dashboard on the port 8080.

### 2) Traefik and a DB
