import React from 'react';
import { Text, View, Button } from 'react-native';

export default function App(){
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Cyberlearn Mobile Skeleton</Text>
      <Button title="Open Web" onPress={()=>{}} />
    </View>
  );
}