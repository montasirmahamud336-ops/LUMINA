import React, { useEffect, useRef } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function GoogleLoginButton() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.google) {
      // @ts-ignore
      window.google.accounts.id.initialize({
        client_id: (import.meta as any).env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
        callback: handleCredentialResponse,
      });

      // @ts-ignore
      window.google.accounts.id.renderButton(
        googleBtnRef.current,
        { 
          theme: 'outline', 
          size: 'large', 
          type: 'standard', 
          shape: 'pill', 
          text: 'signin_with', 
          logo_alignment: 'left',
          width: '100%' 
        }
      );
    }
  }, []);

  const handleCredentialResponse = async (response: any) => {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: response.credential }),
      });

      if (!res.ok) throw new Error('Google authentication failed');

      const data = await res.json();
      login(data.accessToken, data.user);
      navigate(data.user.role === 'ADMIN' ? '/admin' : '/dashboard');
    } catch (error) {
      console.error('Google Auth Error:', error);
    }
  };

  return <div ref={googleBtnRef} className="w-full flex justify-center mt-6" />;
}
