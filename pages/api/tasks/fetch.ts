import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/db'
import lodash from 'lodash';
import { Task } from '../../../components/Task';

const fetch = async (    
    req: NextApiRequest,
    res: NextApiResponse
    ) => {
        try {
            if (req.method !== "GET") {
                res.status(406).end();
            }
            const docs = await db.allDocs({ include_docs: true });
            const allTasks = docs?.rows.map(item => item.doc);
            let filteredTasks = allTasks.filter((item) =>!(item as unknown as Task).isDone);
            if(req.query.isFinished === "true")
                filteredTasks = allTasks.filter((item) =>(item as unknown as Task).isDone);
            const sortedTasks = lodash.orderBy(filteredTasks, ['priority'],['desc']);
            res.status(200).json(sortedTasks);
        } catch (error) {
            res.status(500).write(error);
        }
}

export default fetch;