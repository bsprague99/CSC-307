import React from 'react'
import ReactDOMClient from 'react-dom/client'
import MyApp from './MyApp'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

// Create the container
const container = document.getElementById('root')

// Create a root
const root = ReactDOMClient.createRoot(container)

// Initial render: Render an element to the Root
root.render(
    <GoogleOAuthProvider clientId="475881622329-dq9jv118jnkidrod2igmojke36etu0e4.apps.googleusercontent.com">
        <MyApp />
    </GoogleOAuthProvider>)
