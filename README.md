# App de Tareas - Frontend

Aplicación móvil de gestión de tareas con soporte para funcionamiento offline y sincronización automática. El sistema está compuesto por un frontend móvil y un backend RESTful.

## 🛠 Tecnologías Utilizadas

### Frontend

- [Ionic 7](https://ionicframework.com/) - Framework para desarrollo de aplicaciones móviles
- [Angular 20](https://angular.io/) - Framework de desarrollo frontend
- [Capacitor](https://capacitorjs.com/) - Plataforma de desarrollo nativo
- [SQLite](https://www.sqlite.org/) - Base de datos local
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programación

### Backend
- [Node.js](https://nodejs.org/) - Entorno de ejecución para JavaScript
- [Express](https://expressjs.com/) - Framework web para Node.js
- [MongoDB](https://www.mongodb.com/) - Base de datos NoSQL
- [Mongoose](https://mongoosejs.com/) - ODM para MongoDB

## 📋 Requisitos Previos

### Sistema
- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (v5 o superior)

### Frontend
- [Ionic CLI](https://ionicframework.com/docs/cli)
- [Android Studio](https://developer.android.com/studio) (para desarrollo Android)
- [Xcode](https://developer.apple.com/xcode/) (para desarrollo iOS, solo en macOS)

## 🚀 Instalación

### Backend
1. **Clonar el repositorio del backend**
   ```bash
   git clone https://github.com/alejophotoart/test-app-tasks-back.git
   cd test-app-tasks-back
   ```

2. **Instalar dependencias del backend**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   - Crear archivo `.env` en la raíz del proyecto
   ```env
   PORT=3000
   MONGODB_URI=mongodb:mongodb+srv://alejandronba98:BAkrKvBUSX2BKBVF@miclustershop.akjbkuj.mongodb.net/tasksDB
   ```

4. **Iniciar el servidor**
   ```bash
   nodemon app
   ```

### Frontend
1. **Clonar el repositorio del frontend**
   ```bash
   git clone https://github.com/alejophotoart/test-app-tasks-front.git
   cd test-app-tasks-front
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar plataformas**
   ```bash
   ionic cap add android    # Para Android
   ionic cap add ios       # Para iOS (solo en macOS)
   ```

4. **Ejecutar en navegador (desarrollo)**
   ```bash
   ionic serve
   ```

5. **Ejecutar en dispositivo/emulador**
   ```bash
   # Construir la aplicación
   ionic build
   
   # Copiar los archivos a la plataforma nativa
   ionic cap copy
   
   # Sincronizar cambios con la plataforma nativa
   ionic cap sync
   
   # Abrir en Android Studio / Xcode
   ionic cap open android    # Para Android
   ionic cap open ios       # Para iOS
   ```

## 📱 Características

- Gestión de tareas (CRUD)
- Funcionamiento offline
- Sincronización automática cuando hay conexión
- Interfaz adaptativa
- Almacenamiento local con SQLite
- Soporte para modo oscuro/claro

## 🗄️ Estructura del Proyecto

```
src/
├── app/
│   ├── components/      # Componentes reutilizables
│   ├── interfaces/      # Interfaces TypeScript
│   ├── pages/          # Páginas de la aplicación
│   └── services/       # Servicios
├── assets/             # Recursos estáticos
└── theme/             # Estilos globales
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## ✨ Agradecimientos

- [Ionic Framework](https://ionicframework.com/)
- [Angular Team](https://angular.io/)
- [Capacitor](https://capacitorjs.com/)

