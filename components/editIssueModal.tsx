"use client"

import { useRouter } from "next/navigation";
import Modal from "react-modal";
import React, {ChangeEvent, useState} from "react";


export default function EditIssueModal() {

    // const router = useRouter();

    // interface User {
    //     name: string;
    //     location: string;
    //     issue: string;
    // }

    // const userInitial: User = {
    //     name: "",
    //     location: "",
    //     issue: ""
    // } 

    const [isOpen, setIsOpen] = useState(false)
    // const [user, setUser] = useState(userInitial)

    // function handleChange(e: ChangeEvent<HTMLInputElement>) {
    //     const {name, value} = e.target;
    //     setUser({...user, [name]: value})
    // }

    // async function handleSubmit(e: React.FormEvent) {
    //     e.preventDefault()
        
    //     try {
    //         const response = await fetch("/api/post_issue", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(user)
    //         })
    //         if (response.ok) {
    //             console.log('submitted successfully');
    //             router.push("/")
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
        
    // }

    return (
        // <>
        //     <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        //         <label>Name</label>
        //         <input 
        //         type="text" 
        //         name="name" 
        //         value={user.name}
        //         placeholder=" Edit Name" 
        //         onChange={handleChange}/>
        //         <label>Location</label>
        //         <input 
        //         type="text" 
        //         name="location" 
        //         placeholder=" Edit Location" 
        //         value={user.location}
        //         onChange={handleChange}/>
        //         <label>Nature of Issue</label>
        //         <input 
        //         type="text" 
        //         name="issue"
        //         value={user.issue} 
        //         placeholder=" Edit Issue" 
        //         onChange={handleChange}/>
        //         <button type="submit">Submit</button>
        //     </form>
        // </>
        <div>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
           <h1>Modal Content</h1>
           <button onClick={() => setIsOpen(false)}>Close Modal</button>
        </Modal>
     </div>

    )
}

