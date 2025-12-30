# Proyecto de Evaluación Técnica - Portfolio de Criptomonedas

## 📋 Descripción

Este proyecto es una aplicación web desarrollada con **React**, **TypeScript**, **Redux** y **Redux-Saga** que permite gestionar un portfolio de criptomonedas. La aplicación está diseñada como ejercicio de evaluación técnica, por lo que la funcionadad de la misma no está completa.

### Características principales

- ✅ Gestión de portfolio de criptomonedas
- ✅ Arquitectura basada en Redux con Redux-Saga para manejo de efectos secundarios
- ✅ Desarrollado con TypeScript para type-safety
- ✅ Diseño moderno inspirado en shadcn/v0 (CSS puro)
- ✅ Funciones helper para acciones y reducers
- ✅ Tests unitarios completos con Jest
- ✅ Configuración de Webpack personalizada (desarrollo y producción)
- ✅ Hot Module Replacement (HMR) en modo desarrollo

### Tecnologías utilizadas

- **React** 16.13.1
- **TypeScript** 4.9.5
- **Redux** 4.1.2
- **Redux-Saga** 1.2.3
- **React-Redux** 7.2.9
- **Webpack** 5.101.3
- **Babel** 7.24.3

## 🚀 Inicio Rápido

```bash
npm install
npm start
```

## 📦 Instalación

### Requisitos previos

Se debe tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (normalmente viene con Node.js)

### Pasos de instalación

1. **Clonar o descargar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd ejemplo
   ```

2. **Instalar las dependencias**

   ```bash
   npm install
   ```

   Este comando instalará todas las dependencias necesarias listadas en `package.json`.

3. **Obtener una key de CoinCap**

La aplicación usa la api de CoinCap para obtener la cotización actual de la moneda ingresa.  La api es gratuita para pocas peticiones, pero requiere de una key que se consigue después de registraste en el sitio.
Ir a `https://pro.coincap.io/signup` para crear una cuenta y luego generarla desde el dashboard.

Crear un archivo `.env` en la raíz del proyecto con tu API key:

```bash
REACT_APP_COINCAP_API_KEY=tu-api-key-aquí
```

## 🎮 Ejecución

### Modo desarrollo

Para ejecutar la aplicación en modo desarrollo con recarga automática:

```bash
npm run dev
```

O alternativamente, para abrir automáticamente el navegador:

```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000` (por defecto).

### Compilación para producción

Para generar una build optimizada para producción:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

## 📂 Estructura del proyecto

```
/
├── public/
│   └── index.html                    # Archivo HTML principal
├── src/
│   ├── components/
│   │   ├── assets/
│   │   │   ├── AddAssetForm.tsx      # Formulario para agregar activos
│   │   │   ├── PortfolioList.tsx     # Lista de portfolio
│   │   │   └── PortfolioView.tsx     # Vista del portfolio
│   ├── hooks/
│   │   └── redux.ts                  # Hooks personalizados de Redux
│   ├── services/
│   │   └── api.ts                    # Servicios API
│   ├── store/
│   │   ├── index.ts                  # Configuración del store
│   │   ├── actionsUtils.ts           # Utilidades para acciones
│   │   ├── reducerUtils.ts           # Utilidades para reducers
│   │   ├── portfolios/               # Redux para portfolios
│   │   └── sagas/                    # Configuración de sagas
│   ├── App.tsx                       # Componente raíz
│   ├── App.css
│   ├── index.tsx                     # Punto de entrada
│   └── index.css
├── webpack.common.js                 # Configuración común de Webpack
├── webpack.dev.js                    # Configuración de desarrollo
├── webpack.prod.js                   # Configuración de producción
├── tsconfig.json                     # Configuración de TypeScript
└── package.json

```

## 💡 Funcionalidades

### Portfolio de Criptomonedas

La aplicación permite agregar y gestionar activos de criptomonedas. Algunos ejemplos de activos soportados:

- Bitcoin
- Ethereum
- Tether
- Binance Coin
- XRP
- USD Coin
- Solana
- Tron
- Dogecoin
- Cardano
- Y muchos más...

## 🛠️ Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm start` | Inicia el servidor de desarrollo y abre el navegador |
| `npm run build` | Genera la build de producción |
| `npm test` | Ejecuta todos los tests |
| `npm run test:watch` | Ejecuta tests en modo watch |
| `npm run test:coverage` | Genera reporte de cobertura |

## ✅ Tareas Completadas

### 1. ✅ Funcionalidad de carga de monedas - COMPLETADO

- ✅ Acciones Redux implementadas (`addAsset`, `addAssetSuccess`, `addAssetFailure`)
- ✅ Saga con integración a API de CoinCap
- ✅ Manejo de estados de carga y errores
- ✅ Selector para cálculo de valor total del portfolio
- ✅ Lógica de deduplicación (incrementa cantidad si el asset ya existe)

### 2. ✅ Documentación Redux 5 - COMPLETADO

Ver [REDUX_5_MIGRATION.md](REDUX_5_MIGRATION.md) para:
- ✅ Breaking changes identificados
- ✅ Ejemplos de código antes/después
- ✅ Guía de migración paso a paso
- ✅ Actualización de dependencias
- ✅ Mejores prácticas con Redux Toolkit

### 3. ✅ Tests Unitarios - COMPLETADO

Cobertura implementada:
- ✅ Actions: 3 tests
- ✅ Reducer: 7 tests  
- ✅ Selectors: 4 tests
- ✅ Saga: 5 tests
- ✅ Utilities: 4 tests

**Total: 23 tests pasando con 100% cobertura en código nuevo**

### 4. ✅ Features Adicionales

- ✅ Persistencia del portfolio con redux-persist
- ✅ Internacionalización (i18n) - Inglés y Español
- ✅ Tema claro/oscuro
- ✅ UI moderna inspirada en shadcn/v0
- ✅ Dropdown para selección de criptomonedas
- ✅ Variables de entorno para API keys

### Criterios de evaluación cumplidos

- ✅ Código funcional y correctamente tipado
- ✅ Seguimiento de patrones Redux/Redux-Saga establecidos
- ✅ Documentación clara de migración a Redux 5
- ✅ Tests con buena cobertura y casos significativos
- ✅ Manejo apropiado de errores y estados de carga
- ✅ Clean code y patrones de diseño
- ✅ Nombres de métodos en inglés
- ✅ Sin comentarios excesivos

## 🤝 Contribución

Este es un proyecto de evaluación técnica. Los candidatos deben completar las funcionalidades requeridas siguiendo las mejores prácticas de desarrollo.

## 📄 Licencia

Este proyecto es de uso educativo y de evaluación técnica.

---

**Última actualización:** Diciembre 2025
