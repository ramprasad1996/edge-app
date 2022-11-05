Command to start k3s cluster : curl -sfL https://get.k3s.io | sh -s - --write-kubeconfig-mode 644

Command to start the edge-app and warrant agent pods : kubectl apply -f <yaml-file-name>

Nodejs code to create a warrant : 
client
    .createWarrant({ objectType: "light", objectId: "1", relation: "owner", subject: { objectType: "user", objectId: "srini" } })
    .then((newWarrant) => console.log(newWarrant))
    .catch((error) => console.log(error));

Docker image: ramprasad13160/edge-app:latest

API endpoint examples :
curl "http://localhost:8080/light/on" -H "user: ram" \
curl "http://localhost:8080/ac/on" -H "user: srini" \