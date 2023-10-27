"use client"

import React, {useState, useEffect} from "react";
import Link from 'next/link';
import EditIssueModal from "../components/editIssueModal";

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

  useEffect(() => {
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

    fetchIssues()
  }, [])

  const handleDelete = async (issueId: string) => {
    console.log(`deleting issue ${issueId}`)
  }

  const handleEdit = async (issueId: string) => {
    console.log(`editing issue ${issueId}`)
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
  <main className="flex flex-col items-center">
    <div>
      <h1 className="text-3xl text-center bold p-5">Mattlassian&apos;s Mira - My bespoke CRM System</h1>
    </div>
    <Link href="/newIssue">New Issue</Link>
    <div>
      <table className="table-fixed">
        <tbody className="border border-red-500">
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
              <td className="py-2 px-4">{issue.name}</td>
              <td className="py-2 px-4">{issue.location}</td>
              <td className="py-2 px-4">{issue.issue}</td>
              <td className="py-2 px-4">{issue.creationDate}</td>
              <td className="py-2 px-4">{issue.resolved}</td>
              <td onClick={() => handleEdit(issue._id)}>edit</td>
              <td onClick={() => handleDelete(issue._id)}>delete</td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
      {isOpen && (
          <EditIssueModal
          
          />
        )}
    </div>
  </main>
  )

}
