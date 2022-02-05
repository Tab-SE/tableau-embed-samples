import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring'; // physics based animation library
import Loading from './Loading/Loading.js';
import './Animation.css';
import logo from '../../../assets/images/logo.svg';

// isolates state and behavior of viz load animations
function Animation(props) {
  const [display, setDisplay] = useState(true); // unmount component to avoid animating in the background

  useEffect(() => {
    if (props.interactive) {
      setTimeout(() => {
        setDisplay(false); // delay allows showing exit transition before unmounting
      }, 1000);
    }
  }, [props.interactive])

  // CSS is passed to react-spring to that transitions behave gradually via spring based animation
  const animateProps = useSpring({
    from: { opacity: 0.01, rotate: -360, scale: 0.33 }, 
    to: { opacity: 1, rotate: 0, scale: 1 }, 
    loop: { reverse: true },
    config: { duration: 4000 },
    reset: true
  });
  
  const animateStyles = {
    height: props.articleStyle.height,
    width: props.articleStyle.width,
    ...animateProps // spreading animateProps inside a single styles object to include non-animated styles
  };

  return (
    <>
      {!display ? <></> : 
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
      }
    </>
  )
}

export default Animation;
