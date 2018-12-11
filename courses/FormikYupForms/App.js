import React from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  Text
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .label("Name")
});

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
      validationSchema={validationSchema}
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
          <Text style={{ color: "red" }}>{formikProps.errors.name}</Text>
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
