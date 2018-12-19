import React from "react";
import { View } from "react-native";

export const CenterView = storyFn => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    {storyFn()}
  </View>
);

export const BufferView = storyFn => (
  <View style={{ flex: 1, marginVertical: 40, marginHorizontal: 10 }}>
    {storyFn()}
  </View>
);
