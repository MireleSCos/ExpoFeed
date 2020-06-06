import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import {useAuth} from '../../contexts/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  avatar: {
    marginTop: 10,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
  },
  bio: {
    fontSize: 16,
  },
  body: {
    marginTop: 300,
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
});

const Feed: React.FC = () => {
  const {user, signOut} = useAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{uri: user?.image_url}} />

      <Text style={styles.name}>
        {user?.first_name} {user?.last_name}
      </Text>
      <Text style={styles.bio}>
        Residente no {user?.address_country}, possui {user?.age} anos, perfil:
        {user?.userTypeID}
      </Text>
      <TouchableOpacity style={styles.body} onPress={handleSignOut}>
        <Text style={styles.submitText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feed;
