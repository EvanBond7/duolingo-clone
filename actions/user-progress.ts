'use server';

import db from '@/db/drizzle';
import { getCourseById, getUserProgress } from '@/db/queries';
import { userProgress } from '@/db/schema';
import { auth, currentUser } from '@clerk/nextjs/server';

export const upserUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error('Unauthorized');
  }

  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error('Course not found');
  }

  // TODO: Enable once units and lessons are added
  //   if (!course.units.length || !course.units[0].lessons.length) {
  //     throw new Error('Course is empty');
  //   }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || 'User',
      userImageSrc: user.imageUrl || '/mascot.svg',
    });
  }
};
