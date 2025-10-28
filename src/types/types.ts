import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  BottomTabs: undefined;
  theaters: undefined;
  Home: undefined;
  MovieDetails: { movie: Movie };
  TheaterDetails: { theater: Theater }
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface ShowTimeItem {
  time: string;
  movie: string;
  theater: string;
}

export interface Movie {
  title: string;
  showtimes: string[];
  theater: string;
}

export interface Theater {
  name: string;
  movies: Movie[];
}

export const COLORS = ["#FFC0CB", "#ADD8E6", "#90EE90", "#FFD700"]; // Pink, Light Blue, Light Green, Gold
