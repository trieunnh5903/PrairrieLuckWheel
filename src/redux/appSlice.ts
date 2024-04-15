import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  rates: number[];
  location: string | undefined;
  imageRotation: string | undefined;
  imageBackground: string | undefined;
  giftImage: (string | undefined)[];
}

const initialState: AppState = {
  rates: [0, 25, 0, 25, 0, 25, 0, 25],
  imageBackground: undefined,
  location: undefined,
  imageRotation: undefined,
  giftImage: [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },

    changeRates: (state, action: PayloadAction<number[]>) => {
      state.rates = action.payload;
    },

    changeImageRotation: (state, action: PayloadAction<string>) => {
      state.imageRotation = action.payload;
    },

    changeImageCell: (state, action: PayloadAction<(string | undefined)[]>) => {
      state.giftImage = action.payload;
    },

    changeImageBackground: (state, action: PayloadAction<string>) => {
      state.imageBackground = action.payload;
    },
  },
});

export const {
  changeImageRotation,
  changeImageCell,
  changeRates,
  changeImageBackground,
  changeLocation,
} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default appSlice.reducer;
