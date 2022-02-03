import { useSpring, animated } from 'react-spring'
import './Animation.css'
import logo from '../../../assets/images/logo.svg';

// isolates state and behavior of viz load animations
function Animation(props) {

  // react-spring animation prop
  const animateProps = useSpring({
    from: { opacity: 0.01, rotate: -360, scale: 0.33 }, 
    to: { opacity: 1, rotate: 0, scale: 1}, 
    loop: { reverse: true },
    config: { duration: 4000 }
  });

  return (
    <animated.div style={animateProps}>
      <img 
        src={logo} 
        className={`App-logo ${!props.interactive ? 'active' : 'inactive'}`} 
        alt="logo" 
        height={`${props.articleStyle.height}`} 
        width={`${props.articleStyle.width}`}
      />
    </animated.div>
  )
}

export default Animation;
