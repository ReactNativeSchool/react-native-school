import React from "react";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";

import { Button } from "../components/Button";
import { BufferView } from "./decorators";

storiesOf("Button", module)
  .addDecorator(BufferView)
  .add("default", () => (
    <Button onPress={action("tapped-default")}>Press Me</Button>
  ))
  .add("outline", () => (
    <Button onPress={action("tapped-outline")} outline>
      Press Me
    </Button>
  ));
