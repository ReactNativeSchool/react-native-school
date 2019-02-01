import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Instabug from "instabug-reactnative";

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

  constructor(props) {
    super(props);

    Instabug.startWithToken("b0efa09d936b36032efe2b34ba2adde4", [
      Instabug.invocationEvent.shake
    ]);
  }

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
      })
      .catch(err => {
        alert("an error occurred!");
        Instabug.reportJSException(err);
      });
  };

  incrementNumber = () => {
    this.setState(state => {
      const number = state.number + 1;
      return { number };
    });
  };

  decrementNumber = () => {
    this.setState(state => {
      const number = state.number - 1;
      return { number };
    });
  };

  causeCrash = () => {
    alert(this.state.data.number);
  };

  causeException = () => {
    try {
      throw new Error("This is a very serious error.");
    } catch (error) {
      Instabug.reportJSException(error);
      alert("an error occurred!");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.number}</Text>
        <Button title="Increment Number" onPress={this.incrementNumber} />
        <Button title="Decrement Number" onPress={this.decrementNumber} />
        <Button title="Get New Number" onPress={this.getNumber} />
        <Button title="Cause an exception" onPress={this.causeException} />
        <Button title="Crash it" onPress={this.causeCrash} />
      </View>
    );
  }
}

export default App;
