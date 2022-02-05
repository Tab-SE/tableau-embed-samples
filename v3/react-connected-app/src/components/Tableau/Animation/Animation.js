import { useSpring, animated } from 'react-spring'; // physics based animation library
import Loading from './Loading/Loading.js'
import './Animation.css';
import logo from '../../../assets/images/logo.svg';

// isolates state and behavior of viz load animations
function Animation(props) {
  // CSS is passed to react-spring to that transitions behave gradually via spring based animation
  const animateProps = useSpring({
    from: { opacity: 0.01, rotate: -360, scale: 0.33 }, 
    to: { opacity: 1, rotate: 0, scale: 1 }, 
    loop: { reverse: true },
    config: { duration: 4000 },
    reset: true
  });

  // spreading animateProps inside a single styles object
  const animateStyles = {
    height: props.articleStyle.height,
    width: props.articleStyle.width,
    ...animateProps
  };

  return (
    <>
      <animated.div style={animateStyles} className='loadingDiv'>
        <img 
          src={logo} 
          className={`App-logo`} 
          alt="logo"
        />
      </animated.div>
      <Loading
        interactive={props.interactive}
      />
    </>
  )
}

export default Animation;
