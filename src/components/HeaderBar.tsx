import { View, Text } from "react-native";

const HeaderBar = (props: any) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Text>{props.children}</Text>
    </View>
  );
};

export default HeaderBar;
