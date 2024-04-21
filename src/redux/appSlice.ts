import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  rates: number[];
  location: string | undefined;
  standByBackground: string | undefined;
  imageRotation: string | undefined;
  imageBackground: string | undefined;
  gifts: ({name: string; uri: string} | undefined)[];
  giftResult: {name: string; uri: string} | undefined;
  password: string;
}

const initialState: AppState = {
  rates: [0, 25, 0, 25, 0, 25, 0, 25],
  imageBackground: undefined,
  location: undefined,
  imageRotation: undefined,
  gifts: [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  giftResult: undefined,
  standByBackground: '',
  password: '123456789',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    changeStanByBackground: (state, action: PayloadAction<string>) => {
      state.standByBackground = action.payload;
    },

    changeLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },

    changeRates: (state, action: PayloadAction<number[]>) => {
      state.rates = action.payload;
    },

    changeImageRotation: (state, action: PayloadAction<string>) => {
      state.imageRotation = action.payload;
    },

    changeGifts: (
      state,
      action: PayloadAction<{name: string; uri: string}[]>,
    ) => {
      state.gifts = action.payload;
    },

    changeImageBackground: (state, action: PayloadAction<string>) => {
      state.imageBackground = action.payload;
    },

    changeGiftResult: (
      state,
      action: PayloadAction<{
        name: string;
        uri: string;
      }>,
    ) => {
      state.giftResult = action.payload;
    },
  },
});

export const {
  changePassword,
  changeStanByBackground,
  changeImageRotation,
  changeGifts,
  changeGiftResult,
  changeRates,
  changeImageBackground,
  changeLocation,
} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default appSlice.reducer;
