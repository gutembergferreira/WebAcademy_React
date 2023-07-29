import { TiposUsuarios } from './../resources/tipoUsuario/tipoUsuario.constants';
import { v4 as uuidv4 } from 'uuid';

export interface SeedsDB {
  inserts?: Array<{ model: string; query: string }>;
}

const seeds: Map<number, SeedsDB> = new Map<number, SeedsDB>();

seeds.set(1, {
  inserts: [
    {
      model: 'TipoUsuario',
      query: `INSERT INTO TipoUsuarios (id, rotulo, createdAt, updatedAt) values ('${TiposUsuarios.CLIENT}', 'cliente', now(), now());`,
    },
    {
      model: 'TipoUsuario',
      query: `INSERT INTO TipoUsuarios (id, rotulo, createdAt, updatedAt) values ('${TiposUsuarios.ADMIN}', 'admin', now(), now());`,
    },
  ],
});

seeds.set(2, {
  inserts: [
    {
      model: 'Usuario',
      query: `INSERT INTO Usuarios (id, nome, email, senha, tipoUsuarioId, createdAt, updatedAt) values ('${uuidv4()}', 'Pamela Rodrigues', 'pamela@lojavirtual.com', '$2a$10$Syl9p937Qbpff6is8ljhPOhK2pLViR3FbXmUv0Yo2QyD8efE54YUG', '${
        TiposUsuarios.ADMIN
      }', now(), now());`,
    },
  ],
});

export { seeds };
