import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";


export default  async function GetSingleIssue(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db("crm_app");
        const { id } = req.query;
        const objectId = new ObjectId(id as string);

        const issue = await db.collection("issues").findOne({
            _id: objectId
        })

        res.status(200).json({message: "issue gotten", issue})
    } catch (error) {
        console.error("Error getting single issue by id:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}