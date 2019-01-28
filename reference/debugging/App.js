import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  text: {
    fontSize: 30,
    fontWeight: "bold"
  }
});

class App extends React.Component {
  state = { number: null };

  componentDidMount() {
    this.getNumber();
  }

  getNumber = () => {
    fetch("https://pond-relative.glitch.me/number")
      .then(res => res.json())
      .then(res => {
        this.setState({
          number: res.number
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.number}</Text>
        <Button title="Get Number" onPress={this.getNumber} />
      </View>
    );
  }
}

export default App;
