<template>
  <div class="q-pa-md">
    <div class="row justify-between items-center q-mb-md">
      <h4>Gestão de Usuários</h4>
      <q-btn color="primary" label="Novo Usuário" @click="openDialog()" />
    </div>

    <UserTable :users="store.users" :loading="loading" @edit="openDialog" @delete="deleteUser" />

    <q-dialog v-model="dialog" persistent>
      <UserForm :user="selectedUser" @close="closeDialog" @saved="fetchUsers" />
    </q-dialog>
</div>

</template>

<script setup>
import { useUsers } from '../composables/useUsers';
import UserTable from '../components/UserTable.vue';
import UserForm from '../components/UserForm.vue';

const { store, loading, dialog, selectedUser, openDialog, closeDialog, deleteUser, fetchUsers } = useUsers();
</script>
