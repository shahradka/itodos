import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/db'

export default function update(
    req: NextApiRequest,
    res: NextApiResponse<object>
) {
    try {
        if (req.method !== "PUT") {
            res.status(406).end();
        }
        else if (!req.body)
            res.status(400).end();
        else {
            console.log("request body", req.body.task);
            db.get(req.body.task._id).then(() => {
                return db.put({...req.body.task});
            }).then(function(){
                res.status(200).json({messages:"successfully updated"});
            });
        }
    } catch (error) {
        res.status(500).end();
    }
}