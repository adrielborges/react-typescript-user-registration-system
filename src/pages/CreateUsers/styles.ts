import styled from 'styled-components';
import { Form, Input, Button } from 'semantic-ui-react';

export const Container = styled.div`
  padding: 8px 16px;
`;

export const ButtonUi = styled(Button)`
  margin-top: 15px;
  height: 40px;
  svg {
    margin-right: 8px;
  }
`;

export const FormUi = styled(Form)`
  h2 {
    width: 100%;
  }

  ${ButtonUi} {
    min-width: 180px;
    margin-top: 22px;
  }

  div {
    margin-bottom: 20px;
  }
`;

export const InputUi = styled(Input)`
  margin-top: 15px;
`;
