import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions/translateActions";

const initialState = {
  isLoading: false,
  isError: false,
  text: [],
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    clearTextArea: (state) => {
      state.text = "";
    },
    changText: (state, action) => {
      state.text = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(translateText.rejected, (state, action) => {
      (state.isLoading = false), (state.isError = true);
    });
    builder.addCase(translateText.fulfilled, (state, action) => {
      (state.isError = false),
        (state.isLoading = false),
        (state.text = action.payload);
    });
  },
});

export const { clearTextArea, changText } = translateSlice.actions;

export default translateSlice.reducer;
