import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefs = {
  openapi: '3.1.0',
  info: {
    title: 'Documentação da API da Loja Virtual',
    version: '0.1.0',
  },
  servers: [
    {
      url: 'http://localhost:3333/v1',
    },
  ],
};

export default swaggerJsdoc({
  definition: swaggerDefs,
  apis: ['src/resources/**/*.yaml'],
});
