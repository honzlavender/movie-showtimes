// src/app/HomeScreen.tsx
import React, { useMemo } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import List from "../components/List";
import { Movie, NavigationProp, ShowTimeItem } from "../types/types";
import { useAllMovieData } from "../hooks/getAllMovieData";

// const dummyData = require("../utils/dummyData.json");

interface HomeScreenProps {
  type: "movies" | "theaters" | "showtimes";
}

export default function HomeScreen({ type }: HomeScreenProps) {
  const { theaters, showtimes, movies } = useAllMovieData();
  const navigation = useNavigation<NavigationProp>();

  const uniqueMovies = movies.filter(
    (m: { title: any }, i: any, arr: any[]) =>
      arr.findIndex((x) => x.title === m.title) === i
  );

  const getData = () => {
    switch (type) {
      case "movies":
        return uniqueMovies;
      case "theaters":
        return theaters.map((name: any) => name.name);
      case "showtimes":
        return showtimes;
      default:
        return [];
    }
  };

  const handlePressItem = (movie: Movie) => {
    navigation.navigate("MovieDetails", { movie });
  };

  return (
    <View style={{ flex: 1 }}>
      <List
        data={getData()}
        isShowtimesList={type === "showtimes"}
        onPressItem={handlePressItem}
      />
    </View>
  );
}
