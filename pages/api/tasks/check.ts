import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/db'

export default function check(
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
            db.get(req.body._id).then(function (doc) {
                return db.put({...doc, priority: 0, isDone: req.body.isDone});
            }).then(function(){
                res.status(200).json({messages:"successfully checked"});
            });
        }
    } catch (error) {
        res.status(500).end();
    }
}