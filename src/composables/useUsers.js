import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';

export function useUsers() {
  const store = useUserStore();
  const selectedUser = ref(null);
  const dialog = ref(false);

  onMounted(async () => {
    await store.fetchUsers(); // Garante que o estado muda durante render
  });

  const openDialog = (user = null) => {
    selectedUser.value = user;
    dialog.value = true;
  };

  const closeDialog = () => {
    dialog.value = false;
  };

  return {
    store,
    selectedUser,
    dialog,
    openDialog,
    closeDialog
  };
}
