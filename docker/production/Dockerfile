# Étape 1 : Build de l'application
FROM node:22-slim AS builder

WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
RUN npm install --frozen-lockfile

# Copier le reste du code source
COPY . .

RUN npm run build

FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["dist/main"]
