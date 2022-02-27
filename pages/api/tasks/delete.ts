import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/db'

const del = (    
    req: NextApiRequest,
    res: NextApiResponse<object>
    ) => {
        try {
            if (req.method !== "POST") {
                res.status(406).end();
            }
            if (!req.body)
                res.status(400).end();
            db.get(req.body._id).then(function (doc) {
                db.remove(doc._id, doc._rev);
                res.status(200).json({messages:"successfully deleted"});
            });
        } catch (error) {
            res.status(500).end();
        }
}

export default del;