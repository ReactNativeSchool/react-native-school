import React, { Component } from "react";
import { View, Button, Image, Text } from "react-native";
import ImagePicker from "react-native-image-picker";

import { uploadFileWithProgress, createFormData } from "../util/photoUpload";
import styles from "../styles";
import { SINGLE_UPLOAD_URL } from "../config";

export default class App extends Component {
  state = {
    photo: null,
    progress: 0
  };

  handleUploadPhoto = () => {
    const { photo } = this.state;

    // With progress
    uploadFileWithProgress(
      SINGLE_UPLOAD_URL,
      {
        method: "post",
        body: createFormData(photo, { userId: "123" })
      },
      event => {
        const progress = Math.floor((event.loaded / event.total) * 100);
        console.log("progress", progress);
        this.setState({ progress });
      }
    )
      .then(res => {
        console.log(res);
        alert("Upload success!");
        this.setState({ progress: 0, photo: null });
      })
      .catch(error => {
        console.log("error", error);
        alert("Upload failed!");
      });
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
      maxWidth: 500
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  render() {
    const { photo, progress } = this.state;
    return (
      <View style={styles.container}>
        <Text>Single Image with Progress</Text>
        {photo ? (
          <React.Fragment>
            <Image style={styles.image} source={{ uri: photo.uri }} />
            <Text>{progress}</Text>
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
