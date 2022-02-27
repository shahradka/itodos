import type { Task } from '../components/Task';
export const create = (task: Task) => {
    return new Promise((resolve, reject) => {
        fetch('/api/tasks/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }).then(response => response.json()).then(data => resolve(data)).catch(err => reject(err.statusText))
    });
}

export const del = (id: string) => {
    return new Promise((resolve, reject) => {
        fetch('/api/tasks/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "_id": id })
        }).then(response => response.json()).then(data => resolve(data)).catch(err => reject(err.statusText))
    });
}
export const check = (id: string, isDone:boolean) => {
    return new Promise((resolve, reject) => {
        fetch('/api/tasks/check', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "_id": id, isDone })
        }).then(response => response.json()).then(data => resolve(data)).catch(err => reject(err.statusText))
    });
}
export const fetchById = (id:string) => {
    return new Promise((resolve, reject) => {
        fetch(`/api/tasks/fetchById?id=${id}`)
            .then(response => response.json()).then(data => resolve(data)).catch(err => reject(err.statusText))
    });
}
export const fetchList = () => {
    return new Promise((resolve, reject) => {
        fetch(`/api/tasks/fetch`)
            .then(response => response.json()).then(data => resolve(data)).catch(err => reject(err.statusText))
    });
}
export const fetchFinishedList = () => {
    return new Promise((resolve, reject) => {
        fetch(`/api/tasks/fetch?isFinished=true`)
            .then(response => response.json()).then(data => resolve(data)).catch(err => reject(err.statusText))
    });
}

export const update = (task:Task) => {
    return new Promise((resolve, reject) => {
        fetch('/api/tasks/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        }).then(response => response.json()).then(data => resolve(data)).catch(err => reject(err.statusText))
    });
}