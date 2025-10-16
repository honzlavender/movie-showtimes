import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ShowTimeItem } from "../types/types";

const COLORS = ["#FFC0CB", "#ADD8E6", "#90EE90", "#FFD700"];

interface GroupTimesProps {
  showtimes: ShowTimeItem[];
}

const GroupTimes: React.FC<GroupTimesProps> = ({ showtimes }) => {
  const [expandedHours, setExpandedHours] = useState<{
    [key: string]: boolean;
  }>({});

  const hourLabelToMinutes = (hourLabel: string) => {
    const [hourStr, meridian] = hourLabel.split(" ");
    let hour = parseInt(hourStr, 10);
    if (meridian === "PM" && hour !== 12) hour += 12;
    if (meridian === "AM" && hour === 12) hour = 0;
    return hour * 60;
  };

  const grouped = useMemo(() => {
    const map: { [hour: string]: ShowTimeItem[] } = {};
    showtimes.forEach(({ time, movie, theater }) => {
      const [hourMinute, meridian] = time.split(" ");
      let [hour] = hourMinute.split(":");
      let hourLabel = `${hour} ${meridian}`;
      if (!map[hourLabel]) map[hourLabel] = [];
      map[hourLabel].push({ time, movie, theater });
    });

    for (let key in map) {
      map[key].sort((a, b) => {
        const toMinutes = (timeStr: string) => {
          const [h, rest] = timeStr.split(":");
          const [m, meridian] = rest.split(" ");
          let hours = parseInt(h, 10);
          const minutes = parseInt(m, 10);
          if (meridian === "PM" && hours !== 12) hours += 12;
          if (meridian === "AM" && hours === 12) hours = 0;
          return hours * 60 + minutes;
        };
        return toMinutes(a.time) - toMinutes(b.time);
      });
    }
    return map;
  }, [showtimes]);

  const sortedHours = useMemo(() => {
    return Object.keys(grouped).sort(
      (a, b) => hourLabelToMinutes(a) - hourLabelToMinutes(b)
    );
  }, [grouped]);

  return (
    <ScrollView style={styles.container}>
      {sortedHours.map((hour, idx) => (
        <View
          key={hour}
          style={[
            styles.hourBlock,
            { backgroundColor: COLORS[idx % COLORS.length] },
          ]}
        >
          {/* Hour Label */}
          <View style={styles.hourLabelContainer}>
            <Text style={styles.hourLabel}>{hour}</Text>
          </View>

          {/* Showtime container */}
          <View
            style={[
              styles.showtimeContainer,
              { backgroundColor: COLORS[idx % COLORS.length] },
            ]}
          >
            {grouped[hour].map((st, i) => (
              <View key={i} style={styles.showtimeBox}>
                <Text style={styles.showtimeText}>{st.time}</Text>
                <Text style={styles.movieText}>{st.movie}</Text>
                <Text>@ {st.theater}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hourBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 12,
    paddingVertical: 6,
  },
  hourLabelContainer: {
    alignItems: "flex-end",
    paddingRight: 8,
  },
  hourLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    paddingVertical: 6,
  },
  showtimeContainer: {
    flex: 1,
  },
  showtimeBox: {
    backgroundColor: "rgba(255, 255, 255, 0.59)",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    paddingLeft: 18,
    padding: 8,
    marginVertical: 6,
  },
  showtimeText: {
    fontSize: 14,
    color: "#333",
  },
  movieText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
});

export default GroupTimes;
