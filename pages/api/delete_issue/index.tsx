import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";


export default function DeleteIssue(req: NextApiRequest, res: NextApiResponse) {
    res.json({message: "delete route"})
}