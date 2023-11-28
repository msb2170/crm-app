"use client"

import React, {useState, useEffect} from "react";
import Link from 'next/link';
import EditIssueModal from "../components/editIssueModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useSession, signIn, signOut } from "next-auth/react"

interface Issue {
  _id: string;
  name: string;
  location: string;
  issue: string;
  creationDate: string;
  resolved: boolean;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [issues, setIssues] = useState<Issue[]>([])
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null)

  const { data: session} = useSession()

  

  async function fetchIssues() {
    try {
      const response = await fetch('/api/get_issues')
      if (response.ok) {
        const data = await response.json();
        setIssues(data)
      } else {
        console.error("Failed to fetch issues")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchIssues()
  }, [])

  const handleDelete = async (issueId: string) => {
    console.log(`deleting issue ${issueId}`)
    const confirmed = confirm("Delete this issue?")
    if (confirmed)
    try {
      const response = await fetch(`/api/delete_issue?id=${issueId}`, {
        method: "DELETE",
    })
    if (response.ok) {
      console.log(`issue ${issueId} deleted`)
    }
    } catch (error) {
      console.log(error)
    }
    fetchIssues()
  }

  const handleEdit = async (issueId: string) => {
    console.log(`editing issue ${issueId}`)
    setSelectedIssueId(issueId)
    setIsOpen(true)
  }

  function handleCloseModal() {
    setSelectedIssueId(null)
    setIsOpen(false)
    fetchIssues()
  }

  async function handleToggleResolved(issueId: string) {
      const issueToToggle: Issue | undefined = issues.find((issue) => issue._id === issueId)

      if (!issueToToggle) {
        return
      }

      try {
          const response = await fetch(`/api/edit_issue?id=${issueId}`, {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...issueToToggle,
                resolved: !issueToToggle.resolved,
              }) as string,
          })
          if (response.ok)
          fetchIssues()
      } catch (error) {
          console.log(error)
      }
  }

  if (session) {
  return (
  <main className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-600 to-blue-600">
      <div className="ml-auto flex flex-row items-center space-x-1.5 pr-1.5">
        <p className="italic">signed in as {session?.user?.name}</p>
        <button onClick={() => signOut()} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-1 py-0.5 mt-2 me-1 mb-1 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Sign out</button>
      </div>
    <div>
      <h1 className="text-3xl text-center text-slate-200 bold p-5">Mattlassian&apos;s Mira - My Ticket Management System</h1>
    </div>
    <Link href="/newIssue" className="absolute bottom-2 right-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium border border-white-500 rounded-lg text-sm px-5 py-2.5 mt-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">New Issue</Link>
    <div className="w-full overflow-x-auto">
      <table className=" rounded-lg bg-slate-300">
        <tbody>
          <tr>
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Location</th>
          <th className="py-2 px-4">Nature of issue</th>
          <th className="py-2 px-4">Creation date</th>
          <th className="py-2 px-4">Resolved?</th>
          </tr>
          {
          issues.map((issue) => {
              return (
              <tr key={issue._id}>
              <td className="py-2 px-4 text-center">{issue.name}</td>
              <td className="py-2 px-4 text-center">{issue.location}</td>
              <td className="py-2 px-4 text-center">{issue.issue}</td>
              <td className="py-2 px-4 text-center">{issue.creationDate}</td>
              <td className="py-2 px-4 flex justify-center" onClick={() => handleToggleResolved(issue._id)}>{issue.resolved ? <FontAwesomeIcon icon={faCheckSquare} /> : <FontAwesomeIcon icon={faSquare}  />}</td>
              <td onClick={() => handleEdit(issue._id)}><FontAwesomeIcon icon={faPenToSquare} className="mx-5"/></td>
              <td onClick={() => handleDelete(issue._id)}><FontAwesomeIcon icon={faTrash} className="mr-3"/></td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
      {isOpen && (
          <EditIssueModal
          isOpen={isOpen}
          handleClose={handleCloseModal}
          issueId={selectedIssueId}
          onEditSuccess={fetchIssues}
          />
        )}
    </div>
  </main>
  )}
else {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col mx-auto bg-gradient-to-b from-purple-600 to-blue-600">
      <h1 className="text-xl text-slate-200">Sign In With GitHub</h1>
      <button onClick={() => signIn()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium border border-white-500 rounded-lg text-sm px-5 py-2.5 mt-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign in</button>
    </div>
  )
}
}
