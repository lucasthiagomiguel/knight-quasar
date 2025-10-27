<template>
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="text-h6">{{ user ? 'Editar Usuário' : 'Novo Usuário' }}</div>
    </q-card-section>

    <q-card-section>
      <q-form @submit.prevent="save">
        <q-input v-model="form.nome" label="Nome" outlined dense
        :rules="[val => !!val || 'Campo obrigatório']"/>
        <q-input v-model="form.preco" label="Preco" outlined dense class="q-mt-sm" :rules="[val => !!val || 'Campo obrigatório', val => /^[0-9]+(\.[0-9]{1,2})?$/.test(val) || 'Apenas números e ponto']"/>
          <q-input v-model="form.categoria" label="Categoria" outlined dense
        :rules="[val => !!val || 'Campo obrigatório']"/>

        <div class="row justify-end q-mt-md">
          <q-btn flat label="Cancelar" color="grey" @click="$emit('close')" />
          <q-btn label="Salvar" color="primary" type="submit" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '../stores/userStore';

const props = defineProps({ user: Object });
const emit = defineEmits(['close', 'saved']);

const store = useUserStore();
const form = ref({ nome: '', preco: '', categoria: ''  });

watch(
  () => props.user,
  user => {
    form.value = user ? { ...user } : { name: '', email: '' };
  },
  { immediate: true }
);

async function save() {
  if (props.user) {
    await store.updateUser(props.user.id, form.value);
  } else {
    await store.createUser(form.value);
  }
  emit('saved');
  emit('close');
}
</script>
