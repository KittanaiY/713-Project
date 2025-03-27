import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    message: '' as string,
  }),
  actions: {
    updateMessage(newMessage: string) {
      this.message = newMessage
    },
    resetMessage() {
      this.message = ''
    },
  },
})