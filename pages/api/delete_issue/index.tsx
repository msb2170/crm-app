import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";


export default async function DeleteIssue(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === "DELETE") {
        try {
            const client = await clientPromise;
            const db = client.db("crm_app");
            const { id } = req.query
            const objectId = new ObjectId(id as string)

            const issue = await db.collection("issues").deleteOne({
                _id: objectId
            })

            res.status(200).json({message: "issue deleted", issue})
        } catch (error) {
            console.error("Error deleting data from MongoDB:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}