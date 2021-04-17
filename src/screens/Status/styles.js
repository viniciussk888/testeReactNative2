import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20,
    backgroundColor:'#191970'
  },
  statusBack:{
    color:"#fff",
    fontSize:16,
    fontWeight:'bold'
  },
  statusText:{
    color:"#fff",
    fontSize:16,
    marginRight:"45%"
  },
  Text:{
    color:"#000",
    fontSize:16,
    marginBottom:5
  },
});

export default styles;