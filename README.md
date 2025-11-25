# Cyberlearn3 - Deployment-ready skeleton

此 repo 為 **Cyberlearn3** 的完整可部署樣板，包含：
- Kubernetes manifests / Helm skeleton
- Backend API (Node.js + Express) with endpoints: auth, products, like, cart, checkout, ai
- Frontend (React) multilingual (繁體/简体/English) basic UI
- Keycloak realm export for Google Login + local accounts + TOTP (2FA) placeholders
- Mobile skeleton (React Native / Expo)
- CI: GitHub Actions workflow (build + image push placeholder)
- Instructions (繁體中文 + IT 名詞英文)

> 注意：此為 skeleton，支付整合（Stripe/Alipay/PayMe/FPS）、Palo Alto CN-Series、Commvault 等為 placeholder 或參考設定，需在生產時接入實際 credentials 與服務。

## Quick start (使用 Minikube 本地測試)

1. Clone repo:
```bash
git clone https://github.com/cyberwh15ky/Cyberlearn3.git
cd Cyberlearn3
```

2. Start minikube (或 k3s / kind):
```bash
minikube start --cpus=4 --memory=8192 --driver=docker
minikube addons enable ingress
```

3. Build docker images (本地用 minikube 的 docker-env):
```bash
eval $(minikube docker-env)
# build backend
docker build -t cyberlearn/backend:local ./backend
# build frontend
docker build -t cyberlearn/frontend:local ./frontend
```

4. Deploy Kubernetes manifests:
```bash
kubectl apply -f k8s/
```

5. Add hosts (for Keycloak ingress and frontend ingress):
```bash
echo "$(minikube ip) auth.cyberlearn.local frontend.cyberlearn.local" | sudo tee -a /etc/hosts
```

6. Visit:
- Frontend: http://frontend.cyberlearn.local
- Keycloak: http://auth.cyberlearn.local

## What I generated for you
- `k8s/` : deployments, services, ingress, cert-manager placeholders
- `helm/` : skeleton charts
- `backend/` : Node.js Express app (sample endpoints, in-memory DB)
- `frontend/` : React app (create-react-app style) with i18n
- `keycloak/realm-export.json` : Keycloak realm skeleton (import into Keycloak)
- `mobile/` : Expo React Native skeleton
- `.github/workflows/ci.yml` : CI pipeline skeleton

## Next steps (production)
請依照我之前提供的藍圖完成：
- Keycloak 完整 config + Google OAuth client_id/secret
- Payment gateway merchant accounts (Stripe/Alipay/PayMe/FPS)
- HashiCorp Vault / SealedSecrets for secrets
- Commvault agent or Velero for backups
- Palo Alto CN-Series deployment for L7 security
- Replace in-memory DB with PostgreSQL, Redis 等

---

如果你要，我可以把這個檔案打包給你下載或直接幫你把檔案 push 到 `https://github.com/cyberwh15ky/Cyberlearn3.git`（需要你提供 repo access）。