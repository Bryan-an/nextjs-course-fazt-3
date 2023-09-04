'use client';

import { ITaskModel } from '@/models/task.model';
import { useRouter } from 'next/navigation';

interface Props {
  task: ITaskModel;
}

const AppTaskCard: React.FC<Props> = ({ task }) => {
  const router = useRouter();

  return (
    <section
      className="bg-slate-700 shadow-sm shadow-slate-800 rounded-lg p-4 flex flex-col gap-2 w-96 hover:cursor-pointer active:bg-slate-700/80"
      onClick={() => router.push(`/tasks/edit/${task.id}`)}
    >
      <header>
        <h6 className="font-bold text-cyan-400/70 text-lg">{task.title}</h6>
      </header>
      <p className="font-normal text-slate-300 text-md">{task.description}</p>
    </section>
  );
};

export default AppTaskCard;
