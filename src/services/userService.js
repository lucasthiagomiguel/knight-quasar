import api from '../api/client';

export const userService = {
  async getAll() {
    const { data } = await api.get('/produtos');
    console.log('produtos',data);
    return data;
  },
  async create(payload) {
    const { data } = await api.post('/produtos', payload);
    return data;
  },
  async update(id, payload) {
    const { data } = await api.put(`/produtos/${id}`, payload);
    return data;
  },
  async delete(id) {
    await api.delete(`/produtos/${id}`);
  }
};
