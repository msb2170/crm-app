"use client"

import Modal from "react-modal";
import React, {ChangeEvent, useEffect, useState} from "react";



interface EditIssueModalProps {
    isOpen: boolean,
    handleClose: () => void,
    issueId: string | null,
    onEditSuccess: () => void
}


export default function EditIssueModal({isOpen, handleClose, issueId, onEditSuccess}: EditIssueModalProps) {
    
    interface Issue {
        name: string;
        location: string;
        issue: string;
    }

    const editedInitial = {
        name: "",
        location: "",
        issue: "",
    }

    const [editedIssue, setEditedIssue] = useState<Issue>(editedInitial)
    
    useEffect(() => {
        const fetchIssueData = async() => {
            try {
                const response = await fetch(`/api/get_issue?${issueId}`)
                if(response.ok) {
                    const data = await response.json();
                    setEditedIssue(data)
                } else {
                    console.error('failed to fetch issue data')
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (isOpen && issueId && !editedIssue) {
            fetchIssueData()
        }
    }, [isOpen, issueId, editedIssue])
    

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (editedIssue) {
        const {name, value} = e.target;
        setEditedIssue({...editedIssue, [name]: value})
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        
        try {
            const response = await fetch(`/api/edit_issue?id=${issueId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedIssue)
            })
            if (response.ok) {
                console.log('submitted successfully');
                onEditSuccess()
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div>
        <Modal isOpen={isOpen} onRequestClose={handleClose} ariaHideApp={false}>
           <p>editing issue {issueId}</p>
           {editedIssue && (
           <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <label>Name</label>
                <input 
                type="text" 
                name="name" 
                value={editedIssue.name}
                placeholder=" Edit Name" 
                onChange={handleChange}/>
                <label>Location</label>
                <input 
                type="text" 
                name="location" 
                placeholder=" Edit Location" 
                value={editedIssue.location}
                onChange={handleChange}/>
                <label>Nature of Issue</label>
                <input 
                type="text" 
                name="issue"
                value={editedIssue.issue} 
                placeholder=" Edit Issue" 
                onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
            )}
           <button onClick={handleClose}>Close Modal</button>
        </Modal>
     </div>

    )
}

