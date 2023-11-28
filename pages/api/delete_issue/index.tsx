import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";


export default async function DeleteIssue(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === "DELETE") {

        try {
            const session = await getServerSession(req, res, authOptions)

            if (!session) {
                res.status(401).json({message: "unauthorized"})
                return;
            }

            const client = await clientPromise;
            const db = client.db("crm_app");
            const { id } = req.query
            const objectId = new ObjectId(id as string)

            const issueToEdit = await db.collection("issues").findOne({ _id: ObjectId})

            if (issueToEdit?.name == session?.user?.name?.split(' ')[0]) {

            const issue = await db.collection("issues").deleteOne({
                _id: objectId
            })

            res.status(200).json({message: "issue deleted", issue})
        } else {
            res.status(403).json({message: "You are not the creator of this issue"})
        }   
        } catch (error) {
            console.error("Error deleting data from MongoDB:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
        
    }
}