import * as i from '../../img';
export const styles = theme => ({
  main:{
    width: '100%',
    height: '65%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  block:{
    width: '100%',
    height: 'auto',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  pair:{
    width: '200px',
    height:'200px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundImage:`url(${i.fon})`,
    backgroundSize:'cover',
    borderRadius:'50%',
    margin:'0 40px'
  },
  img:{
    maxWidth: '100%',
    maxHeight: '100%',
  },
});
