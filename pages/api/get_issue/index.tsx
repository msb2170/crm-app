import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";


export default function GetSingleIssue(req: NextApiRequest, res: NextApiResponse) {
    res.json({message: "get single issue route"})
}