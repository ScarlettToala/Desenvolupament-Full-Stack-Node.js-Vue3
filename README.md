# Desenvolupament-Full-Stack-Node.js-Vue3

## 3. Funcionalitats obligatòries
### 3.1 Gestió d’usuaris
* Registre d’usuaris nous.
* Login amb usuari i contrasenya.
* Accés restringit a les funcionalitats internes.
### 3.2 Gestió d’un recurs principal
* Cada grup haurà de definir un recurs principal (per exemple: tasques, projectes, productes, notes, incidències…).
* S’han de poder fer les operacions:
>* Crear
>* Consultar
>* Modificar
>* Eliminar
Només els usuaris autenticats podran accedir a aquestes operacions.
## 4. Requisits tècnics
### Backend
Node.js amb Express.
API REST.
Endpoints mínims:
POST /register
POST /login
CRUD del recurs principal.
Autenticació amb JWT.
Connexió a una base de dades.
### Frontend
Vue 3 amb <script setup>.
Aplicació SPA.
Components mínims:
registre
login
llistat
formulari de creació/edició
Consum de l’API REST mitjançant peticions HTTP.
