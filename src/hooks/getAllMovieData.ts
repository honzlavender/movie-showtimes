import { useMemo } from "react";
import { ShowTimeItem } from "../types/types";

export const useAllMovieData = () => {
  const dummyData = require("../utils/dummyData.json");

  // 🎬 All Movies
  const movies = useMemo(() => {
    return dummyData.theaters.flatMap((t: any) =>
      t.movies.map((m: any) => ({
        title: m.title,
        runtime: m.runtime,
        rating: m.rating,
        theater: t.name,
        showtimes: m.showtimes,
      }))
    );
  }, []);

  // Unique Movies
const uniqueTitles = useMemo(
  () => [...new Set(movies.map((m: { title: any; }) => m.title))],
  [movies]
);

  // 🎭 All Theaters
  const theaters = useMemo(() => {
    return dummyData.theaters.map((t: any) => ({
      name: t.name,
      movies: t.movies.map((m: any) => m.title),
    }));
  }, []);

  // console.log('theaters',theaters)

  // ⏰ All Showtimes
  const showtimes = useMemo<ShowTimeItem[]>(() => {
    const all = dummyData.theaters.flatMap((t: any) =>
      t.movies.flatMap((m: any) =>
        m.showtimes.map((time: string) => ({
          time,
          movie: m.title,
          theater: t.name,
        }))
      )
    );

    // sort by time (ascending)
    const toMinutes = (time: string) => {
      const [h, rest] = time.split(":");
      const [m, meridian] = rest.split(" ");
      let hours = parseInt(h, 10);
      const minutes = parseInt(m, 10);
      if (meridian === "PM" && hours !== 12) hours += 12;
      if (meridian === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    return all.sort((a: { time: string; }, b: { time: string; }) => toMinutes(a.time) - toMinutes(b.time));
  }, []);

  return { movies, theaters, showtimes, uniqueTitles };
};
