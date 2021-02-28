import React from 'react';

import { BiExit } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { HeaderUi, SegmentUi } from './styles';

interface IMenuProps {
  page: 'create' | 'user';
}

const Menu: React.FC<IMenuProps> = ({ page }: IMenuProps) => {
  const history = useHistory();

  const handleExit = () => {
    localStorage.removeItem('@userSystem:token');
    history.push('/');
  };

  return (
    <SegmentUi>
      <HeaderUi as="h2">
        {page === 'create' ? (
          <>
            <Button
              onClick={() => history.push('/users')}
              color="orange"
              icon="arrow left"
            />
            Criar Usuário
          </>
        ) : (
          'Usuários'
        )}
      </HeaderUi>
      <HeaderUi as="h2" onClick={() => handleExit()}>
        <BiExit />
      </HeaderUi>
    </SegmentUi>
  );
};

export default Menu;
