import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base_url = "http://localhost:8000/api";

// Async thunk to fetch user data
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await axios.get(`${base_url}/get`);
  
  return response.data; // Return the fetched data
});

export const updateUser = createAsyncThunk(
  'user/updateUser', 
  async ({ id, firstName, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${base_url}/editUser/${id}`, {
        name: firstName,
        email,
        password,
      });
      console.log(response.data,"response.data");
      
      return response.data; // Return the updated data
    } catch (error) {
      return rejectWithValue(error.response.data); // Reject with the error response
    }
  }
);

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/getbyuseId/${id}`);
      return response.data; // Return the fetched user data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user data');
    }
  }
);

export const deleteUsers = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      
      const response = await axios.delete(`${base_url}/deleteUser/${id}`);
      console.log(response,"delte response");
      
      return response.data; // Return the fetched user data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user data');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],  
    loading: false,
    error: null,
  },
  reducers: {
    // Add other reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Save fetched data in the state
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Handle errors
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true; // Set loading state to true during update
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(state,"state--");
        
        state.loading = false;
        // Optionally, update the state with the updated user data
        console.log(state.users,"state.users");
        if (Array.isArray(state.users)) {
          console.log(state.users, "state.users");
      
          state.users = state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          );
        } else {
          console.error("state.users is not an array");
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Handle update error
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Store the fetched user data in the state
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message if the request fails
      })
      .addCase(deleteUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload.id);
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer; // Default export the reducer
