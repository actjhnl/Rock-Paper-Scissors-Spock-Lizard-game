import * as i from '../../img';
// const rotating = `@keyframes {
//   0% { transform: rotate(-25deg)}
//   100% { transform: rotate(25deg)}
// }
//`
// const rotating = keyframes`
//   0% { color: transparent; }
//   100% { color: radboats; }
// `
export const styles = theme => ({
  main:{
    width: '100%',
    //backgroundColor:'red',
    height: '65%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  block:{
    width: '100%',
    //backgroundColor:'red',
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
    // animation: `${rotating} 0.5s linear 0s infinite`,
    // animationDirection: 'alternate',
    //animation: 'rotate 6s linear infinite',
    //transform: 'rotate(45deg)',
     //transformOrigin: '50px 50px',
  },
  // '@keyframes' rotating {
  //   '0%' {
  //     transform: 'rotate(-25deg)'
  //   },
  //   '100%' {
  //     transform: 'rotate(25deg)'
  //   }
  // }
});
