import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {v4 as uuidv4} from 'uuid';

import type { Task } from './Task';

type Props = {
    onSubmit?: (e: Task) => void
    priorityLevelCount?: number
    value?: Task
}

const Form = ({ onSubmit, priorityLevelCount = 0, value }: Props) => {

    const priorityList = [];

    
    for (let index = 0; index < priorityLevelCount+1; index++) {
        priorityList.push(index+1);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let result= {} as Task;
        if (e.target) {
            const inputs = e.target.querySelectorAll(".form-item input")
            inputs.forEach((element: any) => {
                result = { ...result, [element.name]: element.name === "priority" ? element.value === "" ? 0 : Number(element.value) : element.value }
            });
            if(!value)
            {
                result._id = uuidv4();
                result.isDone = false;
            }

            if (typeof onSubmit === "function") {
                onSubmit(result);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl className='form-item'>
                <TextField name='name' label="task name" defaultValue={value?.name} />
            </FormControl>
            <FormControl className='form-item'>
                <InputLabel id="priority-select" className='left-[16px]'>priority</InputLabel>
                <Select name='priority' labelId="priority-select" label="priority" defaultValue={value?.priority}>
                    {priorityList.map(index => 
                    <MenuItem key={index} value={index}>
                        {index}
                    </MenuItem>
                    )}
                </Select>
            </FormControl>
            <div className='form-item flex'>
                <Box className='grow' />
                <Button type='submit' className='w-1/2' variant="contained" >
                    {value? 'update' : 'create'}
                </Button>
            </div>
        </form>
    )
}

export default Form;