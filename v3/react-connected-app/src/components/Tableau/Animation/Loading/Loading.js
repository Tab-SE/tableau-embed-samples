import { useState, useEffect } from 'react';

function Loading(props) {
  const [loadCount, setLoadCount] = useState(0);
  const [loadText, setLoadText] = useState('Loading   ');

  useEffect(() => {
    const loadInterval = setInterval(() => {
       handleLoadCount();
    }, 500);
    return () => clearInterval(loadInterval);
  }, [loadText]);

  useEffect(() => {
    if (!props.interactive) {
      setLoadText('Loading' + '.'.repeat(loadCount) + ' '.repeat(3 - loadCount));
    }
  }, [loadCount, props.interactive]);

  useEffect(() => {
    if (props.interactive) {
      setLoadText('Done.');
      setLoadCount(0);
    }
  }, [props.interactive])

  const handleLoadCount = () => {
    if (loadCount < 3) {
      setLoadCount(loadCount + 1);
    }
    else if (loadCount === 3) {
      setLoadCount(0);
    }
  }

  return (
    <code className='loadingText'><pre>{loadText}</pre></code>
  )
}

export default Loading;
