import React from "react";
import { View, Text, Button, TextInput, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const StyledInput = ({ formikKey, formikProps, ...rest }) => {
  const inputStyles = {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 3
  };
  let errorMessage = "";

  if (formikProps.errors[formikKey] && formikProps.touched[formikKey]) {
    inputStyles.borderColor = "red";
    errorMessage = formikProps.errors[formikKey];
  }

  return (
    <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
      <TextInput
        style={inputStyles}
        autoCorrect={false}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
      <Text style={{ color: "red" }}>{errorMessage}</Text>
    </View>
  );
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label("Email")
    .email()
    .required(),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(2, "Seems a bit short...")
    .max(10, "We prefer insecure systems, shorten your password.")
});

const BasicLogin = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {formikProps => (
        <React.Fragment>
          <StyledInput
            placeholder="Email"
            formikKey="email"
            formikProps={formikProps}
          />
          <StyledInput
            placeholder="Password"
            formikKey="password"
            formikProps={formikProps}
            secureTextEntry
          />
          {formikProps.isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Button title="Submit" onPress={formikProps.handleSubmit} />
          )}
        </React.Fragment>
      )}
    </Formik>
  </View>
);

export default BasicLogin;
