import AppCreateTaskForm from '@/components/app/new/create-task-form';
import { ITaskModel } from '@/models/task.model';

interface Props {
  params: { id: string };
}

const fetchTask = async ({ id }: { id: number }): Promise<ITaskModel> => {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
    cache: 'no-cache',
  });

  const { task } = await res.json();
  return task;
};

const NewPage: React.FC<Props> = async ({ params }) => {
  let taskToEdit: ITaskModel | undefined;

  if (params.id) {
    const taskId = parseInt(params.id, 10);

    if (isNaN(taskId)) {
      return (
        <div className="flex justify-center items-center p-16 text-xl font-bold text-red-500">
          Invalid task id
        </div>
      );
    }

    taskToEdit = await fetchTask({ id: taskId });
  }

  return (
    <div className="flex justify-center p-24">
      <AppCreateTaskForm taskToEdit={taskToEdit} />
    </div>
  );
};

export default NewPage;
