import { atom } from 'recoil';

export const nameState = atom<string | null>({
  key: 'userNameState',
  default: null, 
});