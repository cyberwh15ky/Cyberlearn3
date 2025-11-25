# Local development notes

- Start minikube and build images into minikube docker:
  eval $(minikube docker-env)
  docker build -t cyberlearn/backend:local ./backend
  docker build -t cyberlearn/frontend:local ./frontend

- Apply manifests:
  kubectl apply -f k8s/

- To see backend logs:
  kubectl logs -l app=cyberlearn-backend -f

- To test without ingress:
  kubectl port-forward svc/cyberlearn-backend 4000:4000
  kubectl port-forward svc/cyberlearn-frontend 8080:80
  Visit http://localhost:8080 (may require proxy adjustments)
