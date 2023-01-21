import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emailService } from './emailsAPI';
import {AllEmailsType, EmailBodyType, EmailListType} from "./Email.type"



export interface initialStateType {
  error: Boolean;
  loading: Boolean;
  allEmails?: AllEmailsType;
  emailBody?: EmailBodyType;
  readEmail:EmailListType[];
  favouriteEmails: EmailListType[];
}

const initialState: initialStateType = {
  loading: true,
  allEmails: undefined,
  error : false,
  emailBody: undefined,
  readEmail: [],
  favouriteEmails: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getEmails = createAsyncThunk(
  'email/fetchEmails',
  async (pgNumber: number) =>  await emailService.fetchEmails(pgNumber)
);

export const getEmailBody = createAsyncThunk('email/fetchEmailBody', async (id: string) => await emailService.fetchEmailBody(id));

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
   handleReadUnreadEmails: (state, action: PayloadAction<EmailListType> ) => {
   state.readEmail.push(action.payload)
   const emails = state.allEmails?.list.filter(email => email.id !== action.payload.id)
   state.allEmails = {list: (emails as EmailListType[]), total: (emails?.length as number)}
  },
    handleMarkAsFavorite: (state, action: PayloadAction<EmailListType>) => {
      state.favouriteEmails?.push(action.payload)
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getEmails.pending, (state) => {
        state.loading = true;
        state.error = false
      })
      .addCase(getEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmails = action.payload;
        state.error = false;
      })
      .addCase(getEmails.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getEmailBody.pending, (state) => {
        state.loading= false;
        state.error = false;
      })
      .addCase(getEmailBody.fulfilled, (state, action) => {
        state.loading = false;
        state.emailBody = action.payload;
        state.error = false;
      })
      .addCase(getEmailBody.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  },
});

export const {handleReadUnreadEmails, handleMarkAsFavorite} = emailSlice.actions

export default emailSlice.reducer