import { View, Text } from "react-native";
import { RootStackParamList } from "../types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "MovieDetails">;

const MovieDetails: React.FC<Props> = ({ route }) => {
  const { movie } = route.params;

  return (
    <View>
      <Text style={{ fontSize: 24 }}>{movie.title}</Text>
      <Text>
        {movie.theater}
      </Text>
    </View>
  );
};

export default MovieDetails;
