import user from '../stores/userStore';
import type { UserData } from '../types/userTypes';

async function getUserData() {
  const response = await fetch('/api/userData', {
    credentials: 'include',
  });

  if (response.ok) {
    const userData: UserData = await response.json();
    user.set(userData);
  } else {
    console.error('Failed to fetch user data');
  }
}

export default getUserData;