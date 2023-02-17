import React, { useEffect, useRef, useState } from 'react';
import CSS from 'csstype';
import styles from './ScrollToTop.module.css';

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);
  const previousScroll = useRef(0);

  useEffect(() => {
    const handleButtonVisibility = () => {
      const scrollOffset = window.scrollY;
      if (scrollOffset > 200) {
        setShowButton(true)
      }
      // if (scrollOffset < previousScroll.current && scrollOffset > 200) {
      //   setShowButton(true);
      // } else if (scrollOffset > previousScroll.current){
      //   setShowButton(false);
      // }
      if (scrollOffset <= 0) {
        setShowButton(false);
      }
      previousScroll.current = scrollOffset;
    };

    window.addEventListener('scroll', handleButtonVisibility);

    return () => {
      window.removeEventListener('scroll', handleButtonVisibility);
    };
  }, []);

  useEffect(() => {
    let hideButtonTimeout: number;
    if (showButton && previousScroll.current === window.scrollY) {
      hideButtonTimeout = setTimeout(() => {
        setShowButton(false)
      }, 3000)
    }

    return () => {
      clearTimeout(hideButtonTimeout)
    }
  }, [showButton])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!showButton) return null;
  return (
    <svg
      onClick={scrollToTop}
      className={styles.scrollToTop}
      xmlns='http://www.w3.org/2000/svg'
      width='120'
      height='118.543'
      viewBox='0 0 120 118.543'
    >
      <g
        id='Group_12692'
        data-name='Group 12692'
        transform='translate(-6655.5 22219)'
      >
        <line
          id='Line_122'
          data-name='Line 122'
          x2='120'
          transform='translate(6655.5 -22216.5)'
          fill='none'
          stroke='#000'
          stroke-width='5'
        />
        <line
          id='Line_123'
          data-name='Line 123'
          y1='44'
          x2='44'
          transform='translate(6671.5 -22213.5)'
          fill='none'
          stroke='#000'
          stroke-linecap='round'
          stroke-width='5'
        />
        <line
          id='Line_124'
          data-name='Line 124'
          x2='44'
          y2='44'
          transform='translate(6717.5 -22213.5)'
          fill='none'
          stroke='#000'
          stroke-linecap='round'
          stroke-width='5'
        />
        <line
          id='Line_125'
          data-name='Line 125'
          x2='2'
          y2='116'
          transform='translate(6716.5 -22216.5)'
          fill='none'
          stroke='#000'
          stroke-width='5'
        />
      </g>
    </svg>
  );
}
