import { defineStore } from 'pinia';
import { userService } from '../services/userService';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchUsers() {
      try {
        this.loading = true;
        this.users = await userService.getAll();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async createUser(user) {
      await userService.create(user);
      await this.fetchUsers();
    },
    async updateUser(id, user) {
      await userService.update(id, user);
      await this.fetchUsers();
    },
    async deleteUser(id) {
      await userService.delete(id);
      this.users = this.users.filter(u => u.id !== id);
    }
  }
});
