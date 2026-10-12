"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {

  const { 
    data: session} = authClient.useSession() 
  
  
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("something went wrong");
        },
        onSuccess: () => {
          window.alert("success");
        },
      }
    );
  };

    const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("something went wrong");
        },
        onSuccess: () => {
          window.alert("success");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4" >
        <p>logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10" >
      <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>
          Create user
        </Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin}>
          Login 
        </Button>
      </div>
    </div>
  );
}