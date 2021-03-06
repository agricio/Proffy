import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading';

import {Archivo_400Regular, Archivo_700Bold, useFonts} from '@expo-google-fonts/archivo';
import {Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import AppStack from './routes/AppStack';

export default function App() {
  let [fonsLoaded] = useFonts({
      Archivo_400Regular, 
      Archivo_700Bold,
      Poppins_400Regular,
      Poppins_600SemiBold

  });

  if(!fonsLoaded) {
    return <AppLoading/>;
  } else {
    return (
      <>
        <StatusBar style="light" />
        <AppStack/>
      </>
    );

  }


}

