import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface AppState {
  rates: number[];
  // isSavedPassword: boolean;
  password: string | null;
  imageRotation: string | undefined;
}

// Define the initial state using that type
const initialState: AppState = {
  rates: [0, 25, 0, 25, 0, 25, 0, 25],
  // isSavedPassword: false,
  password: '123456789',
  imageRotation: undefined,
};

export const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
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
  },
});

export const {savePassword, changeImageRotation, changeRates} =
  appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default appSlice.reducer;
