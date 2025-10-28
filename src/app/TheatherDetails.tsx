import { View, Text } from "react-native";
import { RootStackParamList } from "../types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "TheaterDetails">;

const TheaterDetails: React.FC<Props> = ({ route }) => {
  const { theater } = route.params;

  return (
    <View>
      <Text style={{ fontSize: 24 }}>{theater.name}</Text>
      {theater.movies.map((movie, index) => (
        <Text key={index} style={{ fontSize: 18, marginTop: 4 }}>
          {`${movie}`}
        </Text>
      ))}
    </View>
  );
};

export default TheaterDetails;
