<template>
  <q-table
    :rows="users || []"
    :columns="columns"
    :loading="loading"
    row-key="id"
    flat
    bordered
  >
    <template v-slot:body-cell-actions="props">
      <q-td>
        <q-btn dense flat icon="edit" color="primary" @click="$emit('edit', props.row)" />
        <q-btn dense flat icon="delete" color="negative" @click="$emit('delete', props.row.id)" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
const props = defineProps({
  users: Array,
  loading: Boolean
});

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Nome', field: 'nome', align: 'left' },
  { name: 'preco', label: 'preco', field: 'preco', align: 'left' },
  { name: 'categoria', label: 'categoria', field: 'categoria', align: 'left' },
  { name: 'actions', label: 'Ações', align: 'left' }
];
</script>
