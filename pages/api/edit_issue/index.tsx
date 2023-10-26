import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";


export default function EditIssue(req: NextApiRequest, res: NextApiResponse) {
    res.json({message: "edit an issue route"})
}