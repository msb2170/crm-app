import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";


export default async function EditIssue(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PATCH") 
    try {
        const client = await clientPromise;
        const db = client.db("crm_app")
        const { id } = req.query;
        const {name, location, issue, resolved} = req.body
        const objectId = new ObjectId(id as string);

        const updateDate = new Date();

        const editedIssue = await db.collection("issues").updateOne(
            {
                _id: objectId
            },
            {
                $set: {
                    name: name,
                    location: location,
                    issue: issue,
                    updateDate: updateDate,
                    resolved: resolved
                },
            }
        );
        res.status(200).json({message: "issue edited", editedIssue})
    } catch (error) {
        console.error("Error editing issue:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}