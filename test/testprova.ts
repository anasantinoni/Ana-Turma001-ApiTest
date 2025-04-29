import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

describe('FakeStore API - Testes de CRUD', () => {

  
  it('Deve retornar uma lista de produtos com status 200', async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true); 
  });

  
  it('Deve retornar um produto específico com status 200', async () => {
    const response = await axios.get(`${BASE_URL}/products/1`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
    expect(response.data.id).toBe(1); 
  });

  
  it('Deve criar um novo produto com status 200', async () => {
    const newProduct = {
      title: 'Produto Teste',
      price: 99.99,
      description: 'Descrição do produto teste',
      image: 'https://via.placeholder.com/150',
      category: 'electronics',
    };

    const response = await axios.post(`${BASE_URL}/products`, newProduct);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id'); 
    expect(response.data.title).toBe(newProduct.title); 
  });

  
  it('Deve atualizar um produto existente com status 200', async () => {
    const updatedProduct = {
      title: 'Produto Atualizado',
      price: 120.0,
      description: 'Descrição atualizada do produto',
      image: 'https://via.placeholder.com/150',
      category: 'electronics',
    };

    const response = await axios.put(`${BASE_URL}/products/1`, updatedProduct);
    expect(response.status).toBe(200);
    expect(response.data.title).toBe(updatedProduct.title); 
  });

  it('Deve deletar um produto com status 200', async () => {
    const response = await axios.delete(`${BASE_URL}/products/1`);
    expect(response.status).toBe(200);
  });

  it('Deve retornar erro 400 ao tentar atualizar com dados inválidos', async () => {
    const invalidProduct = {
      title: '',  
      price: -100, 
      description: 'Descrição do produto inválido',
      image: 'https://via.placeholder.com/150',
      category: 'electronics',
    };

    try {
      await axios.put(`${BASE_URL}/products/1`, invalidProduct);
    } catch (error) {
      expect(error.response.status).toBe(400); 
    }
  });

  it('Deve retornar erro 404 ao tentar acessar produto inexistente', async () => {
    try {
      await axios.get(`${BASE_URL}/products/9999`); 
    } catch (error) {
      expect(error.response.status).toBe(404); 
    }
  });

});
