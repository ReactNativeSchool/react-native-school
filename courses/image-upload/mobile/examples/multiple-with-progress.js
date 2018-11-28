import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  Text,
  ScrollView
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { uploadFileWithProgress, createFormData } from "../util/photoUpload";

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
    photos: [],
    progress: 0
  };

  handleUploadPhoto = () => {
    const { photos } = this.state;

    uploadFileWithProgress(
      "http://localhost:3000/api/upload-multiple",
      {
        method: "post",
        body: createFormData(photos, { userId: "123" })
      },
      event => {
        const progress = Math.floor((event.loaded / event.total) * 100);
        this.setState({ progress });
      }
    )
      .then(res => {
        console.log(res);
        alert("Upload success!");
        this.setState({ progress: 0, photos: [] });
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
        this.setState(state => ({
          photos: [...state.photos, response]
        }));
      }
    });
  };

  render() {
    const { photos, progress } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {photos.map(photo => (
          <View key={photo.uri}>
            <Image style={styles.image} source={{ uri: photo.uri }} />
          </View>
        ))}

        {photos.length > 0 && (
          <React.Fragment>
            <Text>{progress}</Text>
            <Button
              title="Upload"
              onPress={this.handleUploadPhoto}
              resizeMode="contain"
            />
          </React.Fragment>
        )}

        <Text>Multiple Images with Progress</Text>
        <Button
          title="Choose Photo"
          onPress={this.handleChoosePhoto}
          resizeMode="contain"
        />
      </ScrollView>
    );
  }
}
