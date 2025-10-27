import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useQuasar } from 'quasar'

export function useUsers() {
  const store = useUserStore();
  const selectedUser = ref(null);
  const dialog = ref(false);
   const $q = useQuasar(); // para usar dialog e notificações

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

  const deleteUser = async (id) => {
    $q.dialog({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este usuário?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      try {
        await store.deleteUser(id); // chama a action do Pinia
        $q.notify({
          type: 'positive',
          message: 'Usuário excluído com sucesso!'
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Erro ao excluir usuário'
        });
      }
    });
  };


  return {
    store,
    selectedUser,
    dialog,
    deleteUser,
    openDialog,
    closeDialog
  };
}
