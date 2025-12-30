import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app: {
        title: 'Crypto Portfolio - Dario Albor',
        subtitle: 'Track your cryptocurrency investments'
      },
      portfolio: {
        title: 'Your Portfolio',
        description: 'Add and track your cryptocurrency investments',
        tip: 'Select a cryptocurrency from the dropdown menu and enter the amount you own'
      },
      form: {
        cryptocurrency: 'Cryptocurrency',
        quantity: 'Quantity',
        addAsset: 'Add Asset',
        selectPlaceholder: 'Select a cryptocurrency...'
      },
      table: {
        assetId: 'Asset ID',
        symbol: 'Symbol',
        quantity: 'Quantity',
        price: 'Price (USD)',
        value: 'Value (USD)',
        total: 'Total Value',
        empty: 'No assets in your portfolio yet. Add one to get started!',
        loading: 'Loading asset data...'
      },
      error: {
        title: 'Error',
        apiKeyRequired: 'API Key Required',
        apiKeyMessage: 'To use this application, you need to configure your CoinCap API key.',
        quickSetup: 'Quick Setup:',
        step1: 'Get a free API key at',
        step2: 'Create a',
        step3: 'file in the project root',
        step4: 'Add your key to the file (see example below)',
        step5: 'Restart the dev server',
        tip: 'Tip: Copy',
        tipContinue: 'to',
        tipEnd: 'and update the key'
      },
      theme: {
        light: 'Light',
        dark: 'Dark'
      },
      language: {
        english: 'English',
        spanish: 'Spanish'
      }
    }
  },
  es: {
    translation: {
      app: {
        title: 'Crypto Portfolio - Dario Albor',
        subtitle: 'Rastrea tus inversiones en criptomonedas'
      },
      portfolio: {
        title: 'Tu Portfolio',
        description: 'Agrega y rastrea tus inversiones en criptomonedas',
        tip: 'Selecciona una criptomoneda del menú desplegable e ingresa la cantidad que posees'
      },
      form: {
        cryptocurrency: 'Criptomoneda',
        quantity: 'Cantidad',
        addAsset: 'Agregar Activo',
        selectPlaceholder: 'Selecciona una criptomoneda...'
      },
      table: {
        assetId: 'ID de Activo',
        symbol: 'Símbolo',
        quantity: 'Cantidad',
        price: 'Precio (USD)',
        value: 'Valor (USD)',
        total: 'Valor Total',
        empty: 'Aún no hay activos en tu portfolio. ¡Agrega uno para comenzar!',
        loading: 'Cargando datos del activo...'
      },
      error: {
        title: 'Error',
        apiKeyRequired: 'Se Requiere API Key',
        apiKeyMessage: 'Para usar esta aplicación, necesitas configurar tu API key de CoinCap.',
        quickSetup: 'Configuración Rápida:',
        step1: 'Obtén una API key gratuita en',
        step2: 'Crea un archivo',
        step3: 'en la raíz del proyecto',
        step4: 'Agrega tu key al archivo (ver ejemplo abajo)',
        step5: 'Reinicia el servidor de desarrollo',
        tip: 'Consejo: Copia',
        tipContinue: 'a',
        tipEnd: 'y actualiza la key'
      },
      theme: {
        light: 'Claro',
        dark: 'Oscuro'
      },
      language: {
        english: 'Inglés',
        spanish: 'Español'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

