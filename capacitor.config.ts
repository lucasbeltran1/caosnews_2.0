import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Desarrollo_movil',
  webDir: 'www',
  plugins: {
    Geolocation: {
      androidPermission: 'ACCESS_FINE_LOCATION', // Permiso para Android
    }
  }
};

export default config;
