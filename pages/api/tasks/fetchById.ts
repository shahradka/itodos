import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/db'

const fetchById = async (    
    req: NextApiRequest,
    res: NextApiResponse
    ) => {
        try {
            if (req.method !== "GET") {
                res.status(406).end();
            }
            if (!req.query.id) {
                res.status(400).end();
            }
            const docId:string = req.query.id as string;
            db.get(docId).then(function (doc) {
                res.status(200).json(doc);
            }).catch(err => {
                res.status(200).json(err);
            });
        } catch (error) {
            res.status(500).write(error);
        }
}

export default fetchById;