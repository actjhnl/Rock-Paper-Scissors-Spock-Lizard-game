export const drawerWidth = 320;

export const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  listMessage:{
    height: '100%',
    display:'flex',
    flexDirection:'column-reverse',
    justifyContent:'flex-start',
    alignItems:'center',
    overflowY: 'scroll',
  },
  //
  opponent: {
    width:'50%',
    backgroundColor:'#B3E5FC',
    minHeight:'40px',
    alignSelf:'flex-start',
    margin:'10px',
    padding:'10px',
    wordWrap: 'break-word',
    flexShrink:0,
    border:'1px solid #81D4FA'
    //borderRadius:'12%'
  },
  you: {
    width:'50%',
    backgroundColor:'#B2EBF2',
    minHeight:'40px',
    alignSelf:'flex-end',
    margin:'10px',
    padding:'10px',
    wordWrap: 'break-word',
    flexShrink:0,
    border:'1px solid #80DEEA'
    //borderRadius:'12%'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
