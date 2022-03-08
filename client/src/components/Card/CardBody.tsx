import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";
function CardBody(props: BoxProps & { variant?: string }) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardBody", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default CardBody;
