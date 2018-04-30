export const drawerWidth = 320;

export const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  inputMessagePanel:{
    width: '100%',
    height: '30%',
    padding: theme.spacing.unit * 3,
  },
  main:{
    width: '100%',
    backgroundColor:'red',
    height: '60%',
  },
  gestureBar:{
    width: '100%',
    backgroundColor:'yellow',
    height: '10%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    display:'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  },
});
