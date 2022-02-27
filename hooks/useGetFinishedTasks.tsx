import { useQuery } from 'react-query'
import { fetchFinishedList as fetchFinishedTasks } from '../lib/api';
import {Task} from '../components/Task';


const useGetFinishedTasks = () => {
  const {data} = useQuery(['tasks',{finished:true}], () => fetchFinishedTasks());
  const finishedTasks:Task [] = data as Task[];
  return {finishedTasks};
}

export { useGetFinishedTasks, fetchFinishedTasks }