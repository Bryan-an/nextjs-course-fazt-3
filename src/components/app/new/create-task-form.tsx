/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import AppInput from '@/components/common/input';
import AppPrimaryButton from '@/components/common/primary-button';
import AppTextarea from '@/components/common/text-area';
import FloppyDiskIcon from '@/icons/floppy-disk';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ITaskModel } from '@/models/task.model';

interface IInput {
  value: string;
  error?: string;
  touched: boolean;
}

interface Props {
  taskToEdit?: ITaskModel;
}

const AppCreateTaskForm: React.FC<Props> = ({ taskToEdit }) => {
  const router = useRouter();

  const [title, setTitle] = useState<IInput>({
    value: taskToEdit?.title ?? '',
    touched: false,
  });

  const [description, setDescription] = useState<IInput>({
    value: taskToEdit?.description ?? '',
    touched: false,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      if (taskToEdit) {
        fetch(`/api/tasks/${taskToEdit.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: title.value,
            description: description.value,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            toast.success(data.message);
            resetForm();
            router.replace('/');
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.message);
          })
          .finally(() => setLoading(false));
      } else {
        fetch('/api/tasks', {
          method: 'POST',
          body: JSON.stringify({
            title: title.value,
            description: description.value,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            toast.success(data.message);
            resetForm();
            router.replace('/');
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.message);
          })
          .finally(() => setLoading(false));
      }
    }
  };

  const resetForm = () => {
    setTitle({ value: '', touched: false });
    setDescription({ value: '', touched: false });
  };

  const validateForm = (): boolean => {
    let valid: boolean = true;
    valid = validateTitle() && valid;
    return valid;
  };

  const validateTitle = (): boolean => {
    let valid: boolean = true;

    if (!title.value) {
      setTitle((prev) => ({ ...prev, error: 'Title is required' }));
      valid = false;
    } else {
      setTitle((prev) => ({ ...prev, error: undefined }));
    }

    return valid;
  };

  useEffect(() => {
    if (title.touched) {
      validateTitle();
    }
  }, [title.value]);

  return (
    <form className="w-80" onSubmit={handleSubmit}>
      <h2 className="text-4xl font-bold text-center text-cyan-400">
        {taskToEdit ? 'Update' : 'Create New'} Task
      </h2>
      <div className="h-12" />
      <AppInput
        value={title.value}
        onChange={(e) => {
          setTitle((prev) => ({ ...prev, value: e.target.value }));
        }}
        error={title.error}
        onFocus={() => {
          if (!title.touched) {
            setTitle((prev) => ({ ...prev, touched: true }));
          }
        }}
        onBlur={() => {
          if (title.touched) {
            validateTitle();
          }
        }}
      />
      <div className="h-5" />
      <AppTextarea
        value={description.value}
        onChange={(e) =>
          setDescription((prev) => ({ ...prev, value: e.target.value }))
        }
      />
      <div className="h-12" />
      <AppPrimaryButton
        text={taskToEdit ? 'Update Task' : 'Create Task'}
        icon={<FloppyDiskIcon />}
        type="submit"
        loading={loading}
      />
    </form>
  );
};

export default AppCreateTaskForm;
