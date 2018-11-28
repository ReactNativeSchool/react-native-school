import React, { Component } from "react";
import { StyleSheet, View, Button, Image, Text } from "react-native";
import ImagePicker from "react-native-image-picker";
import { createFormData } from "../util/photoUpload";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  image: {
    width: 300,
    height: 300
  }
});

export default class App extends Component {
  state = {
    photo: null
  };

  handleUploadPhoto = () => {
    const { photo } = this.state;

    fetch("http://localhost:3000/api/upload-single", {
      method: "post",
      body: createFormData(photo, { userId: "123" })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        alert("Upload success!");
        this.setState({ photo: null });
      });
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  render() {
    const { photo } = this.state;
    return (
      <View style={styles.container}>
        <Text>Single Image without Progress</Text>
        {photo ? (
          <React.Fragment>
            <Image style={styles.image} source={{ uri: photo.uri }} />
            <Button
              title="Upload"
              onPress={this.handleUploadPhoto}
              resizeMode="contain"
            />
          </React.Fragment>
        ) : (
          <Button
            title="Choose Photo"
            onPress={this.handleChoosePhoto}
            resizeMode="contain"
          />
        )}
      </View>
    );
  }
}
