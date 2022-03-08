import { extendTheme } from "@chakra-ui/react";

import { CardComponent } from "./card/Card";
import { CardBodyComponent } from "./card/CardBody";
import { CardHeaderComponent } from "./card/CardHeader";
// import { mode } from "@chakra-ui/theme-tools";
export default extendTheme(
  CardComponent, // Card component
  CardBodyComponent, // Card Body component
  CardHeaderComponent // Card Header component
);
