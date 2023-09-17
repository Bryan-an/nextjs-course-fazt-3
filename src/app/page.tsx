import AppTaskCard from '@/components/app/task-card';
import { ITaskModel } from '@/models/task.model';

const fetchTasks = async (): Promise<ITaskModel[]> => {
  const res = await fetch('http://localhost:3000/api/tasks', {
    cache: 'no-store',
  });

  const { tasks }: { tasks: ITaskModel[] } = await res.json();
  return tasks;
};

const HomePage = async () => {
  const tasks = await fetchTasks();

  return (
    <div className="flex flex-col items-center py-10">
      <header>
        <h1 className="font-bold text-cyan-300 text-4xl">Tasks</h1>
      </header>
      <div className="h-8" />
      {tasks.map((task, index) => (
        <>
          {index !== 0 && <div className="h-4" />}
          <AppTaskCard task={task} key={task.id} />
        </>
      ))}
    </div>
  );
};

export default HomePage;
