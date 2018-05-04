export const styles = theme => ({
  active:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width: '80px',
    height: '80px',
    borderRadius:'50%',
    margin: '8px',
    '&:hover': {
      width: '90px',
      height: '90px'
    },
    '&:active':{
      width:'75px',
      height:'75px',
      backgroundColor:'#D7CCC8'
    },
    transition: 'width 0.5s, height 0.5s, backgroundColor 0.5s'
  },
  disabled:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width: '80px',
    height: '80px',
    borderRadius:'50%',
    margin: '8px',
  },
  choosen:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width: '90px',
    height: '90px',
    borderRadius:'50%',
    margin: '8px',
    backgroundColor:'#D7CCC8'
  },
  img:{
    maxWidth: '100%',
    maxHeight: '100%',
  }
});
