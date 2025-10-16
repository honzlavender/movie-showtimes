import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import GroupTimes from "./GroupTimes";
import { COLORS, Movie, ShowTimeItem } from "../types/types";

interface ListProps {
  data: Movie[] | ShowTimeItem[];
  onPressItem?: (item: Movie) => void;
  isShowtimesList?: boolean;
}

const List: React.FC<ListProps> = ({ data, onPressItem, isShowtimesList }) => {
  type ItemProps = { movie: Movie; index: number };

  const Item = ({ movie, index }: ItemProps) => {
    const backgroundColor = COLORS[index % COLORS.length];
    return (
      <View style={[styles.item, { backgroundColor }]}>
        <TouchableOpacity onPress={() => onPressItem?.(movie)}>
          <Text style={styles.title}>{movie.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (isShowtimesList) {
    return <GroupTimes showtimes={data as ShowTimeItem[]} />;
  }

  return (
    <View>
      <FlatList
        data={data as Movie[]}
        renderItem={({ item, index }) => <Item movie={item} index={index} />}
        // keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    // marginVertical: 8,
  },
  title: {
    fontSize: 32,
  },
});

export default List;
