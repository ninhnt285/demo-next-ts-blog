import {useStore} from '@/lib/store'

export function useCurrentUser() {
  const state = useStore();
  return state.user;
}
