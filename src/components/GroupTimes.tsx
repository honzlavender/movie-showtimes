import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";

interface ShowTimeItem {
  time: string;
  movie: string;
}

interface GroupTimesProps {
  showtimes: ShowTimeItem[];
}

const GroupTimes: React.FC<GroupTimesProps> = ({ showtimes }) => {
  const [expandedHours, setExpandedHours] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <View>
      <Text>2:45 - One Battle After Another</Text>
      <Text>2:45 - Tron</Text>
      <Text>3:00 - One Battle After Another</Text>
      <Text>3:30 - The Smashing Machine</Text>
      <Text>3:45 - One Battle After Another</Text>
    </View>
  );
};

export default GroupTimes;
