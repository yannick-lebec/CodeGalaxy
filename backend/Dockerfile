FROM node:20

WORKDIR /app

COPY package*.json ./

# Installe TOUTES les dépendances (y compris devDependencies)
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]