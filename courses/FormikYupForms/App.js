import React from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator
} from "react-native";
import { Formik } from "formik";

export default () => (
  <SafeAreaView style={{ marginTop: 90 }}>
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values));
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {formikProps => (
        <React.Fragment>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              padding: 10,
              marginBottom: 3
            }}
            onChangeText={formikProps.handleChange("name")}
          />
          {formikProps.isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Button title="Submit" onPress={formikProps.handleSubmit} />
          )}
        </React.Fragment>
      )}
    </Formik>
  </SafeAreaView>
);
