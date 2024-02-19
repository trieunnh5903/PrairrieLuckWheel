import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  rates: number[];
  // isSavedPassword: boolean;
  password: string | null;
  imageRotation: string | undefined;
  giftImage: (string | undefined)[];
}

const initialState: AppState = {
  rates: [0, 25, 0, 25, 0, 25, 0, 25],
  // isSavedPassword: false,
  password: '123456789',
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
    // changeIsSavedPassword: (state, action: PayloadAction<boolean>) => {
    //   state.isSavedPassword = action.payload;
    // },

    changeRates: (state, action: PayloadAction<number[]>) => {
      state.rates = action.payload;
    },

    savePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    changeImageRotation: (state, action: PayloadAction<string>) => {
      state.imageRotation = action.payload;
    },

    changeImageCell: (state, action: PayloadAction<(string | undefined)[]>) => {
      state.giftImage = action.payload;
    },
  },
});

export const {savePassword, changeImageRotation, changeImageCell, changeRates} =
  appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default appSlice.reducer;
