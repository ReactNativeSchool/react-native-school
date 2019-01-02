import React from "react";
import { Switch } from "react-native";

import FieldWrapper from "./FieldWrapper";

export default ({ label, message, messageType, ...rest }) => (
  <FieldWrapper label={label} message={message} messageType={messageType}>
    <Switch {...rest} />
  </FieldWrapper>
);
