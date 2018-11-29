import React, { Component } from "react";
import { View, Button, Image, Text } from "react-native";
import ImagePicker from "react-native-image-picker";

import { createFormData } from "../util/photoUpload";
import styles from "../styles";
import { SINGLE_UPLOAD_URL } from "../config";

export default class App extends Component {
  state = {
    photo: null
  };

  handleUploadPhoto = () => {
    const { photo } = this.state;

    fetch(SINGLE_UPLOAD_URL, {
      method: "post",
      body: createFormData(photo, { userId: "123" })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        alert("Upload success!");
        this.setState({ photo: null });
      })
      .catch(error => {
        console.log("error", error);
        alert("Upload failed!");
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
