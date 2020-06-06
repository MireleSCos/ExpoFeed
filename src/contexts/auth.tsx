import React, {createContext, useState, useEffect, useContext} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';

interface User {
  name?: string;
  first_name?: string;
  last_name?: string;
  cpf?: string;
  age?: 0;
  email?: string;
  image_url?: string;
  address_country?: string;
  address_zipcode?: string;
  userTypeID?: string;
}

interface AuthData {
  email: string;
  password: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(data: AuthData): Promise<boolean>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loardStorageData() {
      const storagedUser = await AsyncStorage.getItem('@FeedAuth:user');
      const storagedToken = await AsyncStorage.getItem('@FeedAuth:token');

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        // eslint-disable-next-line dot-notation
        api.defaults.headers['Authorization'] = storagedToken;
      }
      setLoading(false);
    }
    loardStorageData();
  }, []);

  async function signIn(data: AuthData) {
    const response = await auth.signIn(data);
    if (response.error) {
      return false;
    }
    setUser(response.data.user);
    // eslint-disable-next-line dot-notation
    api.defaults.headers['Authorization'] = response.data.token;
    const userData = response.data.user;
    await AsyncStorage.setItem('@FeedAuth:user', JSON.stringify(userData));
    await AsyncStorage.setItem('@FeedAuth:token', response.data.token);

    return true;
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
