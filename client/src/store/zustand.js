import {create} from 'zustand'

export const useAuthStore = create((set) => ({
    auth: {
        userEmail:'',
        active:false
    },
    setUserEmail: (mail) => set((state)=> ({auth : { ...state.auth, userEmail: mail}}))
}))