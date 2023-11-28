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
                <h1 className="text-2xl mb-5">Submit a New Issue</h1>
                <label className="p-2">Name</label>
                <input 
                type="text" 
                name="name" 
                value={user.name}
                placeholder=" What is your name?" 
                onChange={handleChange}
                className="border border-slate-500 rounded p-1 text-center"
                />
                <label className="p-2">Location</label>
                <input 
                type="text" 
                name="location" 
                placeholder=" Where are you?" 
                value={user.location}
                onChange={handleChange}
                className="border border-slate-500 rounded p-1 text-center"
                />
                <label className="p-2">Nature of Issue</label>
                <input 
                type="text" 
                name="issue"
                value={user.issue} 
                placeholder=" What is the problem?" 
                onChange={handleChange}
                className="border border-slate-500 rounded p-1 text-center"
                />
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium border border-white-500 rounded-lg text-sm px-10 py-2.5 mt-8 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
            </form>
        </>
    )
}

