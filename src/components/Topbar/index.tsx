import React, { useState } from 'react';

import { Container, MenuUi, SegmentUi } from './styles';
import UserList from '../UserList';
import UserInsert from '../UserInsert';

const Topbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('user');

  return (
    <Container>
      <MenuUi tabular>
        <MenuUi.Item
          name="user"
          active={activeItem === 'user'}
          onClick={() => setActiveItem('user')}
        >
          Usuário
        </MenuUi.Item>

        <MenuUi.Item
          name="insert"
          active={activeItem === 'insert'}
          onClick={() => setActiveItem('insert')}
        >
          Inserir Novo Usuário
        </MenuUi.Item>
      </MenuUi>

      {activeItem === 'user' ? (
        <SegmentUi attached="bottom">
          <UserList />
        </SegmentUi>
      ) : (
        <SegmentUi attached="bottom">
          <UserInsert />
        </SegmentUi>
      )}
    </Container>
  );
};

export default Topbar;
