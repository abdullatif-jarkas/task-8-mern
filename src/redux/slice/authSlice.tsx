import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// تعريف أنواع البيانات
interface UserData {
  token: string;
  profileImageUrl: string;
  username: string;
}

interface Item {
  id: number;
  name: string;
  // يمكنك إضافة المزيد من الحقول بناءً على هيكل البيانات
}

interface AuthState {
  user: UserData | null;
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  items: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<UserData>) {
      state.user = action.payload;
      state.error = null;
    },
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.items = [];
      localStorage.clear();
    },
  },
});

export const { setLoading, setUser, setItems, setError, logout } = authSlice.actions;
export default authSlice.reducer;

export const login = (email: string, password: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post('https://test1.focal-x.com/api/login', { email, password });
    const { token, user } = response.data;
    const userData: UserData = {
      token: `Bearer ${token}`,
      profileImageUrl: user.profile_image_url,
      username: user.user_name,
    };
    localStorage.setItem('token', userData.token);
    localStorage.setItem('image', userData.profileImageUrl);
    localStorage.setItem('username', userData.username);
    dispatch(setUser(userData));
  } catch (error: any) {
    dispatch(setError(error.response?.data?.message || 'Login failed'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchItems = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://test1.focal-x.com/api/items', {
      headers: { Authorization: token || '' },
    });
    dispatch(setItems(response.data));
  } catch (error: any) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch items'));
  } finally {
    dispatch(setLoading(false));
  }
};
