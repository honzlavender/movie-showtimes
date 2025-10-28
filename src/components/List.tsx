import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import GroupTimes from "./GroupTimes";
import { COLORS, Movie, ShowTimeItem, Theater } from "../types/types";

interface ListProps {
  data: Movie[] | ShowTimeItem[] | Theater[];
  onPressItem?: (item: Movie | Theater) => void;
  isShowtimesList?: boolean;
}

const List: React.FC<ListProps> = ({ data, onPressItem, isShowtimesList }) => {
  const Item = ({ item, index }: { item: Movie | Theater; index: number }) => {
    const backgroundColor = COLORS[index % COLORS.length];
    const displayText = "title" in item ? item.title : item.name;

    return (
      <View style={[styles.item, { backgroundColor }]}>
        <TouchableOpacity onPress={() => onPressItem?.(item)}>
          <Text style={styles.title}>{displayText}</Text>
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
        data={data as any}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
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
