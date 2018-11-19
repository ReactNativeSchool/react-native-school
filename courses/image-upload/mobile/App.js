import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import ImagePicker from "react-native-image-picker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default class App extends Component {
  handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary({}, response => {
      console.log("photo res", response);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View>
    );
  }
}
