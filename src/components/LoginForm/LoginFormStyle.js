export const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  loginForm:{
    height:'100%',
    display:'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  band:{
    height:'60%',
    width:'100%',
    backgroundColor:'#4FC3F7',
    display:'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  toolbar: theme.mixins.toolbar,
});
