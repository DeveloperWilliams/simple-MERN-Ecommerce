"use client";

import React, { useState, useEffect } from 'react';

export default function CookieRequest() {
  const [isVisible, setIsVisible] = useState(false);

  const checkCookieConsent = () => {
    const cookieConsent = document.cookie.split('; ').find(row => row.startsWith('cookieConsent='));
    return cookieConsent ? true : false;
  };

  const handleAccept = () => {
    document.cookie = "cookieConsent=true; path=/; max-age=31536000";
    setIsVisible(false);
  };

  useEffect(() => {
    if (checkCookieConsent()) {
      setIsVisible(false);
    } else {
      setTimeout(() => {
        setIsVisible(true);
      }, 5000); 
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div style={styles.cookieRequest}>
      <p style={styles.text}>
        We use cookies to improve your experience on our website. By browsing
        this website, you agree to our use of cookies.
      </p>
      <button style={styles.button} onClick={handleAccept}>
        Accept
      </button>
    </div>
  );
}

const styles = {
  cookieRequest: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: '#333',
    color: '#fff',
    padding: '15px',
    textAlign: 'center',
    zIndex: '1000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Josefin Sans, sans-serif',
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'transform 0.5s ease, opacity 0.5s ease',
    animation: 'fadeInUp 1s ease-out forwards',
  },
  text: {
    margin: '0 0 10px 0',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  button: {
    backgroundColor: '#ffbf00',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    fontFamily: 'Josefin Sans, sans-serif',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

const keyframes = `
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

document.head.insertAdjacentHTML('beforeend', `<style>${keyframes}</style>`);
