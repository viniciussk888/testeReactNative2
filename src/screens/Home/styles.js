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
  wellcomerText:{
    color:"#767577",
    fontSize:16
  },
  statusText:{
    color:"#fff",
    fontSize:16,
    fontWeight:'bold'
  },
  MainContainer:{
    alignItems:'center',
    flexDirection:'row',
    padding:20
  },
  serviceStatusContainer:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    padding:20
  },
  intervalContainer:{
    justifyContent:'flex-start',
    flexDirection:'column',
    padding:20,
  }
});

export default styles;