"use client"

import Modal from "react-modal";
import React, {ChangeEvent, useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'


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
           <div className="flex justify-between items-center mb-4">
            <button onClick={handleClose}><FontAwesomeIcon icon={faX} /></button>
            <p className="flex justify-end">editing issue {issueId}</p>
           </div>
           {editedIssue && (
           <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <label className="p-2">Name</label>
                <input 
                type="text" 
                name="name" 
                value={editedIssue.name}
                placeholder="What is your name?"
                onChange={handleChange}
                className="border border-slate-500 rounded p-1 text-center"
                />
                <label className="p-2">Location</label>
                <input 
                type="text" 
                name="location" 
                placeholder="Where are You?"
                value={editedIssue.location}
                onChange={handleChange}
                className="border border-slate-500 rounded p-1 text-center"
                />
                <label className="p-2">Nature of Issue</label>
                <input 
                type="text" 
                name="issue"
                value={editedIssue.issue} 
                placeholder="What is the problem?"
                onChange={handleChange}
                className="border border-slate-500 rounded p-1 text-center"
                />
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium border border-white-500 rounded-lg text-sm px-10 py-2.5 mt-8 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
            </form>
            )}
           
        </Modal>
     </div>

    )
}

