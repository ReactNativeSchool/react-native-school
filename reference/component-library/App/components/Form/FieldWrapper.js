import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../../config/colors";

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  labelText: {
    color: colors.gray,
    fontSize: 18,
    marginBottom: 10
  },
  messageText: {
    color: colors.gray,
    fontSize: 13,
    marginTop: 5
  },
  messageSuccess: {
    color: colors.success
  },
  messageError: {
    color: colors.error
  }
});

export default ({ children, label = "", message = "", messageType }) => {
  const messageStyles = [styles.messageText];

  if (messageType === "success") {
    messageStyles.push(styles.messageSuccess);
  } else if (messageType === "error") {
    messageStyles.push(styles.messageError);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      {children}
      <Text style={messageStyles}>{message}</Text>
    </View>
  );
};
