import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";


export default async function EditIssue(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PATCH") 

    try {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({message: "unauthorized"})
            return;
        }

        const client = await clientPromise;
        const db = client.db("crm_app")
        const { id } = req.query;
        const {name, location, issue, resolved, userName} = req.body
        const objectId = new ObjectId(id as string);

        const updateDate = new Date();

        const issueToEdit = await db.collection("issues").findOne({ _id: ObjectId})

        console.log(issueToEdit)

        console.log(session?.user?.name?.split(' ')[0])

        if (issueToEdit?.name == session?.user?.name?.split(' ')[0]) {

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
                    resolved: resolved,
                    userName: userName
                },
            }
        );
        res.status(200).json({message: "issue edited", editedIssue})
    } else {
        res.status(403).json({message: "You are not the creator of this issue"})
    }
    } catch (error) {
        console.error("Error editing issue:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}