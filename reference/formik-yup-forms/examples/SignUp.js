import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
  Switch
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const FieldWrapper = ({ formikProps, formikKey, label, children }) => {
  const labelStyles = {
    marginBottom: 3
  };

  let errorMessage = "";

  if (formikProps.errors[formikKey] && formikProps.touched[formikKey]) {
    labelStyles.color = "red";
    errorMessage = formikProps.errors[formikKey];
  }

  return (
    <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
      <Text style={labelStyles}>{label}</Text>
      {children}
      <Text style={{ color: "red" }}>{errorMessage}</Text>
    </View>
  );
};

const StyledInput = ({ formikKey, formikProps, label, ...rest }) => {
  const inputStyles = {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 3
  };

  if (formikProps.errors[formikKey] && formikProps.touched[formikKey]) {
    inputStyles.borderColor = "red";
  }

  return (
    <FieldWrapper formikKey={formikKey} label={label} formikProps={formikProps}>
      <TextInput
        style={inputStyles}
        autoCorrect={false}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};

const StyledSwitch = ({ formikKey, formikProps, label, ...rest }) => (
  <FieldWrapper formikKey={formikKey} label={label} formikProps={formikProps}>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </FieldWrapper>
);

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
    .max(10, "We prefer insecure systems, shorten your password."),
  confirmPassword: yup
    .string()
    .label("Confirm password")
    .required()
    .test("password-match", "Passwords must match", function(value) {
      return this.parent.password === value;
    }),
  agreeToTerms: yup
    .boolean()
    .label("terms")
    .test(
      "is-true",
      // eslint-disable-next-line
      "Must agree to ${path} to continue",
      value => value === true
    )
});

const SignUp = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false
      }}
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
            label="Email"
            placeholder="Email"
            formikKey="email"
            formikProps={formikProps}
          />
          <StyledInput
            label="Password"
            placeholder="Password"
            formikKey="password"
            formikProps={formikProps}
            secureTextEntry
          />
          <StyledInput
            label="Confirm Password"
            placeholder="Password"
            formikKey="confirmPassword"
            formikProps={formikProps}
            secureTextEntry
          />
          <StyledSwitch
            label="Agree to Terms"
            formikKey="agreeToTerms"
            formikProps={formikProps}
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

export default SignUp;
