import styled from 'styled-components';
import { Table, Form, Input, Button } from 'semantic-ui-react';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';

export const Container = styled.div``;
export const ModalEdit = styled.div`
  z-index: 100;
  position: absolute;
  width: 100vw;
  height: 100%;

  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgb(0, 0, 0, 0.7);

  div:first-child {
    padding: 10px 15px;
    background: #fcfcfc;
  }
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
    margin-top: 30px;
  }

  input {
    ::placeholder {
      font-weight: bold;
      opacity: 1;
    }
  }
`;

export const InputUi = styled(Input)``;

export const TableUi = styled(Table)``;

export const FaEditSvg = styled(FaEdit)`
  cursor: pointer;
`;
export const FaTrashSvg = styled(FaTrash)`
  margin-left: 10px;
  cursor: pointer;
`;

export const FaSearchSvg = styled(FaSearch)``;
