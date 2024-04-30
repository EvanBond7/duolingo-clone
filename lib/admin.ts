import { auth } from '@clerk/nextjs/server';

const adminIds = ['user_2fKSXnv6fyySpZVb9ChWmE5nN8q'];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
