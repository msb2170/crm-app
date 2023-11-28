import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import {getServerSession} from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]";

export default async function PostIssue(req: NextApiRequest, res: NextApiResponse) {


    if (req.method === "POST") {
        
        try {
            const session = await getServerSession(req, res, authOptions)

            if(!session) {
                res.status(401).json({message: "please login to post an issue"})
                return
            }

            const client = await clientPromise;
            const db = client.db("crm_app");

            const {name, location, issue} = req.body

            const creationDate = new Date().toLocaleDateString('en-US', {
                dateStyle: 'medium',
                hour12: true
            });

            const userName = session?.user?.name

            console.log(userName)

            const result = await db.collection("issues")
            .insertOne({
                name,
                location,
                issue,
                resolved: false,
                creationDate,
                userName
            });
            
            res.status(200).json({ message: "Form data submitted successfully", result });
        } catch (error) {
            console.error("Error inserting data into MongoDB:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } 
}
