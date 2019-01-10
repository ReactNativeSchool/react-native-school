import React from "react";
import { SafeAreaView } from "react-native";
import { Form, TextInput, Switch } from "./components/Form";
import { Button } from "./components/Button";

export default () => (
  <SafeAreaView style={{ flex: 1 }}>
    <Form header="Hello." subheader="Please create a new account">
      <TextInput label="Email" keyboardType="email-address" />
      <TextInput label="Password" secureTextEntry />
      <TextInput label="Confirm Password" secureTextEntry />
      <Switch label="Agree to Terms" />
      <Button>Sign Up</Button>
      <Button outline>Sign In</Button>
    </Form>
  </SafeAreaView>
);

// export default from "../storybook";
