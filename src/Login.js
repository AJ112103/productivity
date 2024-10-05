import React, { useEffect } from 'react';
import { auth, provider } from './firebaseConfig.js';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user){
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate])

  const signInWithGoogle = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        console.log('User signed in:', result.user);
        navigate('/')
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome</h1>
        <p>Please sign in to continue</p>
        <button className="login-button" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
