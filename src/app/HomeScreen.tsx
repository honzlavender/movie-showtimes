// src/app/HomeScreen.tsx
import React, { useMemo } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import List from "../components/List";
import { RootStackParamList } from "../../App";

const dummyData = require("../utils/dummyData.json");

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HomeScreenProps {
  type: "movies" | "theaters" | "showtimes";
}

export default function HomeScreen({ type }: HomeScreenProps) {
  const navigation = useNavigation<NavigationProp>();

  // --- prepare data with useMemo for performance --- //
  const movieTitles = useMemo(
    () =>
      dummyData.theaters.flatMap((t: any) => t.movies.map((m: any) => m.title)),
    []
  );

  const theaters = useMemo(
    () => dummyData.theaters.map((t: any) => t.name),
    []
  );

  const showtimes = useMemo(
    () =>
      dummyData.theaters
        .flatMap((t: any) => t.movies.flatMap((m: any) => m.showtimes))
        .sort((a: string, b: string) => {
          const toMinutes = (time: string) => {
            const [h, rest] = time.split(":");
            const [m, meridian] = rest.split(" ");
            let hours = parseInt(h, 10);
            const minutes = parseInt(m, 10);
            if (meridian === "PM" && hours !== 12) hours += 12;
            if (meridian === "AM" && hours === 12) hours = 0;
            return hours * 60 + minutes;
          };
          return toMinutes(a) - toMinutes(b);
        }),
    []
  );

  const getData = () => {
    switch (type) {
      case "movies":
        return movieTitles;
      case "theaters":
        return theaters;
      case "showtimes":
        return showtimes;
      default:
        return [];
    }
  };

  //   const handlePressItem = (item: string) => {
  //     if (type === "movies") {
  //       navigation.navigate("Theaters", { movieTitle: item });
  //     }
  //     // optionally handle other types
  //   };

  return (
    <View style={{ flex: 1 }}>
      <List data={getData()} isShowtimesList={type === "showtimes"} />
    </View>
  );
}
