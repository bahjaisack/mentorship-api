import { Mutation, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import {Button} from '@/components/ui/button'

async function createTask(newTask) {
  const response = await fetch(`http://localhost:5000/api/tasks`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  })
  if(!response) throw new Error('failed to create a task');
  return response.json();
}


const Task = () => {
    const [task, setTask] =  useState('');
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['tasks']})
        }
    })

    const handleAdd = () => {
        mutation.mutate({title: task, completed: false})
    }
  return (
    <div>
        <input type="text" value={task} onChange={(e)=>setTask(e.target.value)} />
        <button onClick={handleAdd}>Add Task</button>
        <Button>Add Task</Button>
    </div>
  )
}

export default Task