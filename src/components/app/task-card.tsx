'use client';

import { ITaskModel } from '@/models/task.model';
import { useRouter } from 'next/navigation';
import TrashIcon from '@/icons/trash';
import EditIcon from '@/icons/edit';
import toast from 'react-hot-toast';

interface Props {
  task: ITaskModel;
}

const AppTaskCard: React.FC<Props> = ({ task }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
      });

      const { message } = await res.json();
      toast.success(message);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <section className="bg-slate-700 shadow-sm shadow-slate-800 rounded-lg p-4 flex gap-2 w-96 active:bg-slate-700/80 hover:scale-[1.030] transition-transform">
      <div className="flex-1 flex flex-col gap-2">
        <header>
          <h6 className="font-bold text-cyan-400/70 text-lg">{task.title}</h6>
        </header>
        <p className="font-normal text-slate-300 text-md">{task.description}</p>
      </div>
      <button onClick={() => router.push(`/tasks/edit/${task.id}`)}>
        <EditIcon />
      </button>
      <button onClick={handleDelete}>
        <TrashIcon />
      </button>
    </section>
  );
};

export default AppTaskCard;
