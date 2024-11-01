import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Image } from "expo-image";

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/Loading.gif")}/>
    </View>
  );
};

const styles=StyleSheet.create({
container:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'white',
  flexDirection:'column',
  width:'100%',
  height:'100%'
},
image:{
width:Dimensions.get('window').width/3,
height:Dimensions.get('window').width/3,
}
});

export default LoadingComponent;
