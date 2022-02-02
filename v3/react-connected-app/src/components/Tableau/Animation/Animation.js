import './Animation.css'
import logo from '../../../assets/images/logo.svg';

function Animation(props) {
  return (
    <img 
      src={logo} 
      className={`App-logo ${!props.interactive ? 'active' : 'inactive'}`} 
      alt="logo" 
      height={`${props.articleStyle.height}`} 
      width={`${props.articleStyle.width}`}
    />
  )
}

export default Animation;
