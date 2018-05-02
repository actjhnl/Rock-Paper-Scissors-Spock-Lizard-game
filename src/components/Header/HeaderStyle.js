export const drawerWidth = 320;
export const styles = theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  flex: {
    flex: 1,
  },
});
