import React, { FormEvent, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Segment,
  Form,
  Input,
  ButtonProps,
  FormProps,
  SegmentProps,
} from 'semantic-ui-react';

// import api from '../../services/api';

import * as S from './styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { email, password };
    // const response = await api.post('/usuarios', user);

    localStorage.setItem('@userSystem:token', '1');

    history.push('/users');
  };

  return (
    <S.Container>
      <Segment color="orange" textAlign="left">
        <h2>Bem Vindo!</h2>

        <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <Form.Input
            icon="user"
            iconPosition="left"
            label="Email"
            placeholder="Digite seu email"
            pattern="[^ @]*@[^ @]*"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <Form.Input
            icon="lock"
            iconPosition="left"
            label="Password"
            type="password"
            placeholder="Digite sua Senha"
            minLength="4"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <Form.Field
            color="orange"
            control={Button}
            content="Entrar"
            type="submit"
          />
        </Form>
      </Segment>
    </S.Container>
  );
};

export default Login;
