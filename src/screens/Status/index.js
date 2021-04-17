import React  from 'react';
import {Text, View, ScrollView} from 'react-native';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

export default function Status({route}) {
  const pacotes = route.params.pacotes;
  const {goBack} = useNavigation();

  function returnToHome() {
    goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={returnToHome}>
          <Text style={styles.statusBack}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.statusText}>Status</Text>
      </View>

      <ScrollView>
        {pacotes.length > 0 &&
          pacotes.map(pacote => (
            <View
              style={{padding: 5, borderBottomWidth: 1, marginHorizontal: 15}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.Text}>Pacote ID: {pacote.id.substring(0, 8)}</Text>
                <Text style={styles.Text}>{pacote.hour}</Text>
              </View>
                <Text style={styles.Text}>{pacote.status}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}
