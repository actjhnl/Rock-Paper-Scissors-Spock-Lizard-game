export const drawerWidth = 320;

export const styles = theme => ({
  gestureBar:{
    display:'flex',
    flexFlow:'row nowrap',
    justifyContent:'flex-start',
    alignItems:'center',
    width: '100%',
    backgroundColor:'#f5f5f5',
    height: '15%',
  },
  gesture:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width: '80px',
    height: '80px',
    borderRadius:'50%',
    //backgroundColor:'green',
    margin: '8px',
    '&:hover': {
      width: '100px',
      height: '100px'
    },
    '&:active':{
      width:'75px',
      height:'75px',
      backgroundColor:'#D7CCC8'
    },
    transition: 'width 0.5s, height 0.5s, backgroundColor 0.5s'
  },
  img:{
    maxWidth: '100%',
    maxHeight: '100%',
  }
});
