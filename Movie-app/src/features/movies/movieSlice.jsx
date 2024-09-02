import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from '../../common/apis/MovieApi';
import { APIKEY } from '../../common/apis/MovieApiKey';

// Thunks for asynchronous actions
export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {
    const response = await MovieApi.get(`?apiKey=${APIKEY}&s=${term}&type=movie`);
    console.log(response);
    return response.data;
});

export const fetchAsyncShows = createAsyncThunk("movies/fetchAsyncShows", async (term) => {
    const response = await MovieApi.get(`?apiKey=${APIKEY}&s=${term}&type=series`);
    return response.data;
});

export const fetchAsyncMovieOrShowDetail = createAsyncThunk("movies/fetchAsyncMovieOrShowDetail", async (id) => {
    const response = await MovieApi.get(`?apiKey=${APIKEY}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {},
    status: null,
};

// Slice creation with reducers and extra reducers
const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addMovies: (state, { payload }) => {
            state.movies = payload;
        },
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncMovies.pending, () => {
                console.log("Pending");
            })
            .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
                console.log("Fetched Successfully!");
                return { ...state, movies: payload };
            })
            .addCase(fetchAsyncMovies.rejected, () => {
                console.log("Rejected!");
            })
            .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
                console.log("Fetched Successfully!");
                return { ...state, shows: payload };
            })
            .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
                console.log("Fetched Successfully!");
                return { ...state, selectMovieOrShow: payload };
            });
    }
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;