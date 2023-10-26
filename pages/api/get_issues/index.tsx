import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function GetIssues(req: NextApiRequest, res: NextApiResponse) {
    
    if(req.method === "GET") {
        const client = await clientPromise
        const db = client.db("crm_app")

        try {
            const issues = await db.collection('issues')
            .find({})
            .toArray()
            res.status(200).json(issues)
        } catch (error) {
            console.log(error)
        }
    }
}