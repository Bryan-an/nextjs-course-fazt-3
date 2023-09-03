import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { ITaskEntity } from '@/models/task.entity';

interface IParams {
  id: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  const taskId = parseInt(id, 10);

  if (isNaN(taskId)) {
    return NextResponse.json({ message: 'Invalid task id' }, { status: 400 });
  }

  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task) {
    return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json({ task });
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const { id } = params;
  const taskId = parseInt(id, 10);

  if (isNaN(taskId)) {
    return NextResponse.json({ message: 'Invalid task id' }, { status: 400 });
  }

  const { title, description }: ITaskEntity = await request.json();

  if (title) {
    if (typeof title !== 'string') {
      return NextResponse.json(
        { message: 'Title must be a string' },
        { status: 400 }
      );
    }
  }

  if (description !== undefined) {
    if (typeof description !== 'string' && description !== null) {
      return NextResponse.json(
        { message: 'Description must be a string | null' },
        { status: 400 }
      );
    }
  }

  let updatedTask: ITaskEntity;

  try {
    updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { title, description },
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: 'Task not found', stack: error },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: 'Task updated successfully',
    updatedTask,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { id } = params;
  const taskId = parseInt(id, 10);

  if (isNaN(taskId)) {
    return NextResponse.json({ message: 'Invalid task id' }, { status: 400 });
  }

  let removedTask: ITaskEntity;

  try {
    removedTask = await prisma.task.delete({ where: { id: taskId } });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: 'Task not found', stack: error },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: 'Task removed successfully',
    removedTask,
  });
}
