import { useQuery } from 'react-query'
import { fetchList as fetchTasks } from '../lib/api';
import {Task} from '../components/Task';


const useGetNewTasks = () => {
  const {data} =  useQuery('tasks', () => fetchTasks());
  const tasks: Task[]  = data as Task[];
  return {tasks};
}

export { useGetNewTasks, fetchTasks }