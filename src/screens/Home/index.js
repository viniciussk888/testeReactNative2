import React, {useEffect, useState} from 'react';
import {Text, View, Image, Switch} from 'react-native';
import styles from './styles';
import icon from '../../assets/icon.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import useLocation from '../../hooks/useLocation';
import BackgroundTimer from 'react-native-background-timer';
import api from '../../services/api';
import uuid from 'react-native-uuid';

export default function Home() {
  const {navigate} = useNavigation();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [isEnabled, setIsEnabled] = useState(false);
  const [time, setTime] = useState(10000);
  const [service, setService] = useState('');
  const [conected, setConected] = useState(false);
  const [pacotes] = useState([]);

  const {coords, errorMsg} = useLocation();

  async function upPacks(pacote){
    await api.post(`points/${pacote.id}`,{
      pacote
    })
  }

  async function savePack(latitude, longitude) {
    var data = new Date();
    NetInfo.fetch().then(state => {
      setConected(state.isConnected);
      if (state.isConnected) {

        const pacote = {
          id: uuid.v4(),
          latitude,
          longitude,
          status: "Sincronizado",
          hour:
            data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds(),
        };
        upPacks(pacote)

        pacotes.push(pacote)
      } else {
  
        const pacote = {
          id: uuid.v4(),
          latitude,
          longitude,
          status: "Não sincronizado",
          hour:
            data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds(),
        };
        pacotes.push(pacote)
      }
    });

  }

  const intervalId = BackgroundTimer.setInterval(() => {
    if (isEnabled === true) {
      if (coords) {
        savePack(coords.latitude, coords.longitude);
        console.log(pacotes)
      } else {
        console.log(errorMsg);
      }
    }
  }, time);

  function navigateToStatus() {
    navigate('Status',{
      pacotes:pacotes
    });
  }

  useEffect(() => {
    if (isEnabled) {
      setService('ATIVO');
    } else {
      setService('INATIVO');
      BackgroundTimer.clearInterval(intervalId);
    }
  }, [isEnabled]);

   function upPacksNoSync(){
    pacotes.forEach( async function(pacote) {
      if(pacote.status==="Não sincronizado"){
        await api.post(`points/${pacote.id}`,{
          pacote
        })
        pacote.status = 'Sincronizado';
      }
    });
  }

  useEffect( ()=>{
    if(conected===true){
      upPacksNoSync()
    }
  },[conected])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.wellcomerText}>Olá, bem-vindo</Text>
        <TouchableOpacity onPress={navigateToStatus}>
          <Text style={styles.statusText}>Status</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.MainContainer}>
        <Image style={{height: 60, width: 60}} source={icon} />
        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            My GPS - Tracking
          </Text>
          {conected === true ? (
            <Text style={{color: '#32CD32', fontWeight: 'bold'}}>Online</Text>
          ) : (
            <Text style={{color: 'red', fontWeight: 'bold'}}>Offline</Text>
          )}
        </View>
      </View>

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
        }}
      />

      <View style={styles.serviceStatusContainer}>
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Status do serviço
          </Text>
          <Text>Serviço {service}</Text>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#767577'}}
          thumbColor={isEnabled ? '#32CD32' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.intervalContainer}>
        <Text>Intervalo de comunicação</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            color="#191970"
            value={10000}
            status={time === 10000 ? 'checked' : 'unchecked'}
            onPress={() => setTime(10000)}
          />
          <Text>10s</Text>

          <RadioButton
            color="#191970"
            value={5000}
            status={time === 5000 ? 'checked' : 'unchecked'}
            onPress={() => setTime(5000)}
          />
          <Text>5s</Text>

          <RadioButton
            color="#191970"
            value={3000}
            status={time === 3000 ? 'checked' : 'unchecked'}
            onPress={() => setTime(3000)}
          />
          <Text>3s</Text>

          <RadioButton
            color="#191970"
            value={1000}
            status={time === 1000 ? 'checked' : 'unchecked'}
            onPress={() => setTime(1000)}
          />
          <Text>1s</Text>
        </View>
      </View>
    </View>
  );
}
