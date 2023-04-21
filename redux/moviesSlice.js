import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  topRated: [],
  nowPlaying: [],
  popular: [],
  upcoming: [],
  isLoading: false,
};

// Fetch top rated movies
export const getTopRated = createAsyncThunk("movies/topRated", async () => {
  try {
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=08c913892b91143d37c6b4e1ee778db2&language=en-US&page=1`
    );
    const response = await request.json();
    return response.results;
  } catch (e) {
    console.log(e);
  }
});

// Fetch now playing movies
export const getNowPlaying = createAsyncThunk("movies/nowPlaying", async () => {
  try {
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=08c913892b91143d37c6b4e1ee778db2&language=en-US&page=1`
    );
    const response = await request.json();
    return response.results;
  } catch (e) {
    console.log(e);
  }
});

// Fetch popular movies
export const getPopular = createAsyncThunk("movies/popular", async () => {
  try {
    const request = await fetch(`
        https://api.themoviedb.org/3/movie/popular?api_key=08c913892b91143d37c6b4e1ee778db2&language=en-US&page=1`);
    const response = await request.json();
    return response.results;
  } catch (e) {
    console.log(e);
  }
});

// Fetch upcoming movies
export const getUpcoming = createAsyncThunk("movies/upcoming", async () => {
  try {
    const request = await fetch(`     
        https://api.themoviedb.org/3/movie/upcoming?api_key=08c913892b91143d37c6b4e1ee778db2&language=en-US&page=1`);
    const response = await request.json();
    return response.results;
  } catch (e) {
    console.log(e);
  }
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTopRated.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTopRated.fulfilled, (state, action) => {
      state.isLoading = false;
      state.topRated = action.payload;
    });
    builder.addCase(getTopRated.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getNowPlaying.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNowPlaying.fulfilled, (state, action) => {
      state.isLoading = false;
      state.nowPlaying = action.payload;
    });
    builder.addCase(getNowPlaying.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getPopular.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPopular.fulfilled, (state, action) => {
      state.isLoading = false;
      state.popular = action.payload;
    });
    builder.addCase(getPopular.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUpcoming.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUpcoming.fulfilled, (state, action) => {
      state.isLoading = false;
      state.upcoming = action.payload;
    });
    builder.addCase(getUpcoming.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default moviesSlice.reducer;
