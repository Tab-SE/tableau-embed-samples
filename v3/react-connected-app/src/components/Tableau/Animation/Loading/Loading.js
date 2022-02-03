import { useState, useEffect } from 'react';

function Loading(props) {
  const [loadCount, setLoadCount] = useState(0);
  const [loadText, setLoadText] = useState('Loading');

  useEffect(() => {
    const loadInterval = setInterval(() => {
       handleLoadCount();
    }, 500);
    return () => clearInterval(loadInterval);
  }, [loadText]);

  useEffect(() => {
    setLoadText('Loading' + '.'.repeat(loadCount));
  }, [loadCount]);

  const handleLoadCount = () => {
    if (loadCount < 3) {
      setLoadCount(loadCount + 1);
      console.count('loadCount < 3');
    }
    else if (loadCount === 3) {
      setLoadCount(0);
      console.count('loadCount === 3');
    }
  }

  return (
    <code className='loadingText'>{loadText}</code>
  )
}

export default Loading;