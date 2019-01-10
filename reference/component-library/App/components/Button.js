import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import colors from "../config/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 7
  },
  containerOutline: {
    borderColor: colors.border,
    backgroundColor: colors.white
  },

  text: {
    color: colors.white,
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "500"
  },
  textOutline: {
    color: colors.primary
  }
});

export const Button = ({
  children = "",
  onPress = () => {},
  outline = false
}) => {
  const containerStyles = [styles.container];
  const textStyles = [styles.text];

  if (outline) {
    containerStyles.push(styles.containerOutline);
    textStyles.push(styles.textOutline);
  }

  return (
    <TouchableOpacity onPress={onPress} style={containerStyles}>
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
};
