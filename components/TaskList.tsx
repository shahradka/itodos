import React, {useState} from 'react';
import type { Task } from './Task';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';

import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    tasks: Task[]
    onDelete?: (id: string) => void
    onComplete?: (id: string, isDone: boolean) => void
    onTabChange?: (tabNumber: string) => void
    onItemClick?: (id: string) => void
}

const TaskList = ({ tasks, onDelete, onComplete, onTabChange, onItemClick }: Props) => {

    const [currentTab, setCurrentTab] = useState('undone');

    const handleDelete = (e: any) => {
        e.stopPropagation();
        if (typeof onDelete === "function") {
            onDelete(e.target.id.split("_")[1]);
        }
    }
    const handleComplete = (e: any) => {
        if (typeof onComplete === "function") {
            onComplete(e.target.id.split("_")[1], e.target.checked);
        }
    }
    const handleTabChange = (e: any, newValue: string) => {
        setCurrentTab(newValue);
        if(typeof onTabChange === "function")
            onTabChange(newValue);
    };
    const handleItemClick = (e: any) => {
        if(typeof onItemClick === "function")
            onItemClick(e.target.id);
    };
    return (<>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={currentTab}  onChange={handleTabChange} aria-label="lab API tabs example">
                <Tab label="Current Jobs" value="undone" />
                <Tab label="Finished Jobs" value="finished" />
            </Tabs>
        </Box>
            <List className='w-full'>
                {tasks.map(task =>
                    <ListItem
                        key={task._id}
                        disablePadding
                    >
                        <ListItemButton role={undefined} dense>
                            <ListItemIcon>
                                <Checkbox
                                    id={`complete_${task._id}`}
                                    edge="start"
                                    checked={task.isDone}
                                    tabIndex={-1}
                                    disableRipple
                                    onChange={handleComplete}
                                />
                            </ListItemIcon>
                            {task.isDone? <ListItemText disableTypography id={task._id} primary={task.name} className="line-through" /> : 
                            <ListItemText disableTypography id={task._id} primary={task.name} className="action-link" onClick={handleItemClick} />}
                            
                        </ListItemButton>
                        {!task.isDone && <Button id={`del_${task._id}`} onClick={handleDelete} variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                        }
                    </ListItem>
                )}
            </List>
        </>
    )
}

export default TaskList;