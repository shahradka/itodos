import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/db'

export default function create(
    req: NextApiRequest,
    res: NextApiResponse<object>
) {
    try {
        if (req.method !== "POST") {
            res.status(406).end();
        }
        else if (!req.body)
            res.status(400).end();
        else {
            db.put(req.body);
            res.status(200).json({ message: "successfully added" });
        }
    } catch (error) {
        res.status(500).end();
    }
}