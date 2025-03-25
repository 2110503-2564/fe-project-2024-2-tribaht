import  { createSlice,PayloadAction} from "@reduxjs/toolkit"
import { BookingItem,CompanyItem } from "../../../interface"

type BookState={
    bookItems:CompanyItem[];
}

const initialState:BookState={bookItems:[]};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<CompanyItem>) => {
      const index = state.bookItems.findIndex(
        (item) => item.name === action.payload.name
      );
      if (index !== -1) {
        
        state.bookItems[index] = action.payload;
      } else {
       
        state.bookItems.push(action.payload);
      }
    },
    removeBooking: (state, action: PayloadAction<CompanyItem>) => {
        state.bookItems = state.bookItems.filter(
          (item) =>
            item.nameLastname !== action.payload.nameLastname ||
            item.tel !== action.payload.tel ||
            item.name !== action.payload.name ||
            item.bookDate !== action.payload.bookDate
        );
    },
}})
        export const { addBooking,removeBooking } = bookSlice.actions
export default bookSlice.reducer
