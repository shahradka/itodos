import React, { useState, useEffect } from 'react';

import lodash from 'lodash';

import { dehydrate, QueryClient, useQueryClient } from 'react-query'

import Modal from '@mui/material/Modal';

import Box from '@mui/material/Box';

import { db } from '../lib/db';

import Layout from '../components/layout';
import Form from '../components/form';
import type { Task } from '../components/Task';
import TaskList from '../components/TaskList';
import Toolbar from '../components/toolbar';

import {
    create as createTask, del as deleteTask, check as completeTask, fetchById as fetchTaskById,
    update as updateTask
} from '../lib/api';

import { useGetNewTasks } from '../hooks/useGetNewTasks';

import { useGetFinishedTasks } from '../hooks/useGetFinishedTasks';


const Index = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<Task>();
    const [err, setErr] = useState<string>();
    const [isFinish, setIsFinished] = useState<boolean>(false);
    const { tasks } = useGetNewTasks();
    const { finishedTasks } = useGetFinishedTasks();

    const queryClient = useQueryClient();
    
    useEffect(() => {
        if(isFinish) queryClient.invalidateQueries('tasks');
    }, [isFinish]);

    useEffect(() => {
        if (editTask) setOpenModal(true);
    }, [editTask]);

    const handleCreateTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setOpenModal(true);
    }
    const handleCloseModal = async () => {
        setOpenModal(false);
        setEditTask(undefined);
    }

    function handleSubmit(e: Task) {
        console.log(editTask);
        if (!editTask) {
            createTask(e).then(data => queryClient.invalidateQueries('tasks')
            ).catch(err => setErr(err));
        }
        else {
            const taskId = editTask._id;
            const taskRev = editTask._rev;
            const taskWithoutId = lodash.cloneDeep(lodash.omit(e, '_id'));
            updateTask({ "_id": taskId, "_rev": taskRev, ...taskWithoutId }).then(data => queryClient.invalidateQueries('tasks')
            ).catch(err => setErr(err));
        }
        setOpenModal(false);
    }

    function handleDeleteTask(e: string) {
        deleteTask(e).then(data => queryClient.invalidateQueries('tasks')
        ).catch(err => setErr(err));
    }

    function handleCompleteTask(id: string, isDone: boolean) {
        completeTask(id, isDone).then(data => queryClient.invalidateQueries('tasks')
        ).catch(err => setErr(err));
    }
    function handleTabChange(e: string) {
        if (e === "finished")
            setIsFinished(true);
        else
            setIsFinished(false);
    }
    function handleItemClick(e: string) {
        fetchTaskById(e).then(data => {
            setEditTask(data as Task);
        }).catch(err => setErr(err));
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Layout title='lets write your todo' Toolbar={<Toolbar onClick={handleCreateTask} />} >
            <TaskList onDelete={handleDeleteTask} onComplete={handleCompleteTask} onTabChange={handleTabChange} onItemClick={handleItemClick}
                tasks={isFinish ? finishedTasks : tasks} />
            <Modal open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Form onSubmit={handleSubmit} value={editTask} priorityLevelCount={(tasks as []).length} />
                    <p>{err}</p>
                </Box>
            </Modal>
        </Layout>
    )
}


export async function getStaticProps() {

    const queryClient = new QueryClient();
    const docs = await db.allDocs({ include_docs: true });
    const allTasks = docs?.rows.map(item => item.doc);
    let filteredTasks = allTasks.filter((item) => !(item as unknown as Task).isDone);
    const sortedTasks = lodash.orderBy(filteredTasks, ['priority'], ['desc']);
    await queryClient.prefetchQuery("tasks", () => sortedTasks);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    }
}

export default Index
