import { ITaskModel } from '@/models/task.model';

const fetchTasks = async (): Promise<ITaskModel[]> => {
  const res = await fetch('http://localhost:3000/api/tasks');
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
          <section
            key={task.id}
            className="bg-slate-700 shadow-sm shadow-slate-800 rounded-lg p-4 flex flex-col gap-2 w-96"
          >
            <header>
              <h6 className="font-bold text-cyan-400/70 text-lg">
                {task.title}
              </h6>
            </header>
            <p className="font-normal text-slate-300 text-md">
              {task.description}
            </p>
          </section>
        </>
      ))}
    </div>
  );
};

export default HomePage;
