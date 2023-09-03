import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { ITaskEntity } from '@/models/task.entity';

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  const { title, description }: ITaskEntity = await request.json();

  if (!title) {
    return NextResponse.json({ message: 'Title is required' }, { status: 400 });
  }

  if (typeof title !== 'string') {
    return NextResponse.json(
      { message: 'Title must be a string' },
      { status: 400 }
    );
  }

  if (description && typeof description !== 'string') {
    return NextResponse.json(
      { message: 'Description must be a string' },
      { status: 400 }
    );
  }

  const newTask = await prisma.task.create({ data: { title, description } });
  return NextResponse.json({ newTask, message: 'Task created successfully' });
}
