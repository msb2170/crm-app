"use client"

import { useRouter } from "next/navigation";
import React, {ChangeEvent, useState} from "react";


export default function NewIssue() {
    const router = useRouter();

    interface User {
        name: string;
        location: string;
        issue: string;
    }

    const userInitial: User = {
        name: "",
        location: "",
        issue: ""
    } 

    const [user, setUser] = useState(userInitial)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        
        try {
            const response = await fetch("/api/post_issue", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                console.log('submitted successfully');
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <label>Name</label>
                <input 
                type="text" 
                name="name" 
                value={user.name}
                placeholder=" What is your name?" 
                onChange={handleChange}/>
                <label>Location</label>
                <input 
                type="text" 
                name="location" 
                placeholder=" Where are you?" 
                value={user.location}
                onChange={handleChange}/>
                <label>Nature of Issue</label>
                <input 
                type="text" 
                name="issue"
                value={user.issue} 
                placeholder=" What issue are you having?" 
                onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

