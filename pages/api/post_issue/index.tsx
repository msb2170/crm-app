import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";


export default async function PostIssue(req: NextApiRequest, res: NextApiResponse) {


    if (req.method === "POST") {

        try {
            const client = await clientPromise;
            const db = client.db("crm_app");

            const {name, location, issue} = req.body

            const creationDate = new Date().toLocaleDateString('en-US', {
                dateStyle: 'medium',
                hour12: true
            });

            const result = await db.collection("issues")
            .insertOne({
                name,
                location,
                issue,
                resolved: false,
                creationDate
            });
            
            res.status(200).json({ message: "Form data submitted successfully", result });
        } catch (error) {
            console.error("Error inserting data into MongoDB:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } 
}
