'use client';

import * as React from 'react';
import { OAuthStrategy } from '@clerk/types';
import { useSignIn } from '@clerk/nextjs';

export default function OauthSignIn() {
  const { signIn } = useSignIn();

  if (!signIn) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/david',
      redirectUrlComplete: '/',
    });
  };

  // Render a button for each supported OAuth provider
  // you want to add to your app. This example uses only Google.
  return (
    <div>
      <button onClick={() => signInWith('oauth_google')}>
        Sign in with Google
      </button>
    </div>
  );
}