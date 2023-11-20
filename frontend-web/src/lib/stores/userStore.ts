import { writable } from 'svelte/store';
import type { UserData } from '../types/userTypes'

const userStore = writable<UserData | null>(null);

export default userStore;
