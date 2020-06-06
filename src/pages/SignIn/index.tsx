import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';

import {useAuth} from '../../contexts/auth';

const SignIn: React.FC = () => {
  const {signIn} = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [auth, setAuth] = useState<boolean>(true);

  function handleChangeEmail(
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    const value = event.nativeEvent.text;

    setFormData({...formData, email: value});
  }
  function handleChangePassword(
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    const value = event.nativeEvent.text;
    setFormData({...formData, password: value});
  }

  async function handleSignIn() {
    //Setar Email e senha informado nos inputs e mandaria para rota de auth
    const log = await signIn(formData);
    setAuth(log);
  }

  return (
    <KeyboardAvoidingView style={styles.backgroud}>
      <View style={styles.containerLogo}>
        <Image source={require('../../assets/logo.png')} />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="email"
          autoCorrect={false}
          onChange={handleChangeEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          autoCorrect={false}
          onChange={handleChangePassword}
        />

        <TouchableOpacity style={styles.btnSubmit} onPress={handleSignIn}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{auth ? '' : 'Dados Inválidos'}</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backgroud: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: '#4507A1',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
  },
  errorText: {
    color: '#F00000',
    fontSize: 18,
  },
});

export default SignIn;
