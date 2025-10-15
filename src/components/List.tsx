import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import GroupTimes from "./GroupTimes";

const COLORS = ["#FFC0CB", "#ADD8E6", "#90EE90", "#FFD700"]; // Pink, Light Blue, Light Green, Gold

interface ListProps {
  data: string[];
  onPressItem?: (item: string) => void;
  isShowtimesList?: boolean;
}

const List: React.FC<ListProps> = ({ data, onPressItem, isShowtimesList }) => {
  type ItemProps = { title: string; index: number };

  const Item = ({ title, index }: ItemProps) => {
    const backgroundColor = COLORS[index % COLORS.length];
    return (
      <View style={[styles.item, { backgroundColor }]}>
        <TouchableOpacity onPress={() => onPressItem?.(title)}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (isShowtimesList) {
    return <GroupTimes />;
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <Item title={item} index={index} />}
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
