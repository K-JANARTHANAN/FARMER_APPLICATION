import React, { useState } from "react";
import MapComponent2 from "./MapComponent2";
import "./App2.css";

const App2 = () => {
    const [user, setUser] = useState(null);

    const handleSignUp = async (userData) => {
        const response = await fetch('http://localhost:8080/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        const data = await response.text();
        alert(data);
    };

    const handleSignIn = async (userData) => {
        const response = await fetch('http://localhost:8080/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        const data = await response.text();
        if (data === "Login successful") {
            setUser(userData);
        } else {
            alert(data);
        }
    };

    return (
        <div>
            {!user ? (
                <>
                    <h2>Sign Up</h2>
                    <SignUp onSignUp={handleSignUp} />
                    <h2>Sign In</h2>
                    <SignIn onSignIn={handleSignIn} />
                </>
            ) : (
                <MapComponent2 />
            )}
        </div>
    );
};

const SignUp = ({ onSignUp }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignUp({ name, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Sign Up</button>
        </form>
    );
};

const SignIn = ({ onSignIn }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignIn({ name, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default App2;