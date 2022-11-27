import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CalculatorState {
  totalInvestedSoFar: number | null,
  currentPortfolioValue: number | null
}

const initialState: CalculatorState = {
    totalInvestedSoFar: null,
    currentPortfolioValue: null
}

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    updateTotalInvestment: (state, action: PayloadAction<number>) => {
      state.totalInvestedSoFar = action.payload
    },
    updateCurrentPortfolioValue: (state, action: PayloadAction<number>) => {
        state.currentPortfolioValue = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateTotalInvestment, updateCurrentPortfolioValue } = calculatorSlice.actions

export default calculatorSlice.reducer