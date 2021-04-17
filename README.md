<h1 align="center">
<img alt="react-native-app" title="#delicinha" src="https://user-images.githubusercontent.com/30902898/115111086-f156d100-9f54-11eb-8dd5-2cf0fe237728.gif" width="200px" />
</h1>



Segundo teste para vaga React Native - Contele

Projeto React Native Cli, desenvolvido com base na proposta fornecida pela empresa em: https://github.com/contele/cntl-test/tree/master/react-native

Bibliotecas utilizadas:<br/>
  react-native-background-timer <br/>
  @react-navigation/native <br/>
  react-native-uuid <br/>
  @react-native-community/netinfo <br/>
  react-native-geolocation-service

SOBRE O APP:<br/>
  O app consiste em um sincronizador, que vai pegar a localização do usuario, e enviar para o backend em intervalos de tempo. O app tem duas telas, a primeira tela é para iniciar o serviço e configurar o intervalo de sincronização, a segunda contem uma lista com os pacotes sincronizados ou nao.
  
LOCALIZAÇÃO:<br/>
  A localização é obtida atraves do seguinte metódo.
```
if (permission) {
        await Geolocation.getCurrentPosition(       //se as permissões foram aceitas, obtemos a localização aqui
          ({ coords }) => {
	// O parâmetro {coords} desestrutura a resposta, obtendo apenas a parte relativa às coordenadas. Você também pode receber apenas (position) e observar outras informações que são obtidas ao se solicitar a localização. Nesse exemplo, apenas precisamos das coordenadas.
            setCoords({
              latitude: coords.latitude,
              longitude: coords.longitude,
            });
          }, (error) => {
            setErrorMsg('Não foi possível obter a localização');
          }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, showLocationDialog: true } 
          //showLocationDialog: essa função convida automaticamente o usuário a ativar o GPS, caso esteja desativado.
          //enableHighAccuracy: vai solicitar a ativação do GPS e coletar os dados dele
          //timeout: determina o tempo máximo para o dispositivo coletar uma posição
          //maximumAge: tempo máximo para coleta de posição armazenada em cache
        )
      }
```

A SINCRONIZAÇÃO:<br/>
  Apos iniciar o serviço alternando o Switch para ativado o seguinte metodo começa a rodar.
```
BackgroundTimer.setInterval(() => {
    if (isEnabled === true) {
      if (coords) {
        savePack(coords.latitude, coords.longitude);
        console.log(pacotes)
      } else {
        console.log(errorMsg);
      }
    }
  }, time);
```
  Esse metodo funciona tanto em segundo como em primeiro plano, e de acordo com o tempo estabelecido vai ser chamado o metodo savePack(coords) para enviar o pacote ao backend.
  ```
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
  ```
  Esse metódo verifica se tem internet, em caso de true, ele envia ao backend o pacote, em caso de false, ele salva o pacote com status "Não sincronizado".
  Uitlizando o Hook useEffect, e feita uma verificação para quando a internet voltar, ser iniciado um forEach subindo apenas os pacotes que tem o status "Não sincronizado".
  ```
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
  ```
OBRIGADO PELA OPORTUNIDADE :)
