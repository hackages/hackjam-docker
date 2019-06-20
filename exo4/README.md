# Orchestration with Docker swarm
## Docker swarm exercice

For this set of exercices you'll need 3 linux virtual machines with docker installed.

### 1) Configure the master node

Choose one of the three linux virtual machines and configure it as the master for swarm.

Tip, don't use the virtual machine console since you'll need to keep the token in your clipboard.

Hint, if it works , you should see the port TCP+UDP 7946, UDP 4789 and TCP 2377 open by using the command below.

```
sudo netstat -plunt
```

### 2) Play with your master node

Try to change the certificate rotation period to one week. 

Check the status and the health .

### 3) Workers

Add some workers to your node, to do that you'll need to ssh on the 2 others linux virtual machines and pase the token you found in the first exercice

Check the status, and the health.

Promote one worker to manager.

### 4) Starting a service

Try to create a multi-host overlay network to connect your service

### 5) Deploy a stack 

Try to deploy the previous stack you have created with docker-compose