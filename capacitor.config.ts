import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dedsec.kultora',
  appName: 'Culture-App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
