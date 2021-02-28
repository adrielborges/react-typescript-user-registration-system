import React, { FormEvent, useState } from 'react';

import { v4 as uuid } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaSearch } from 'react-icons/fa';
import MaskedInput from 'react-input-mask';
import api from '../../services/api';
import apiCep from '../../services/apiCep';

import { Container, ButtonUi, FormUi } from './styles';

import maskCep from '../../utils/expressions/maskCep';
import maskCpf from '../../utils/expressions/maskCpf';

const UserInsert: React.FC = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');

  const toastElement = (message: string) => toast.success(message);
  const toastElementError = (message: string) => toast.error(message);

  const handleAutoCompleteAddressByCEP = async () => {
    try {
      const { data } = await apiCep.get(`/${cep}/json/`);

      if (data.erro === true)
        return toastElementError('Erro ao buscar o cep, tente novamente!');

      setCity(data.localidade);
      setStreet(data.logradouro);
      return setNeighborhood(data.bairro);
    } catch (error) {
      return toastElementError('Erro ao buscar o cep, tente novamente!');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newForm = {
        id: uuid(),
        nome: name,
        cpf,
        email,
        endereco: {
          cep: Number(cep),
          rua: street,
          numero: Number(number),
          bairro: neighborhood,
          cidade: city,
        },
      };

      await api.post('/usuarios', newForm);
      toastElement('Usuário cadastrado com sucesso!');
    } catch (error) {
      toastElementError('Erro ao cadastrar o usuário, tente novamente!');
    }
  };

  return (
    <Container>
      <ToastContainer />
      <FormUi onSubmit={handleSubmit}>
        <h2>Cadastrar novo usuário</h2>
        <br />
        <FormUi.Group>
          <FormUi.Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nome"
            type="name"
            label="Nome"
            name="name"
            id="name"
            required
          />

          <FormUi.Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            label="Email"
            type="email"
            name="email"
            id="email"
            required
          />

          <FormUi.Input
            value={cpf}
            label="CPF"
            type="text"
            name="cpf"
            id="cpf"
            minLength="11"
            required
          >
            <MaskedInput
              mask={maskCpf}
              placeholder="123.456.789-99"
              onChange={e => setCpf(e.target.value)}
            />
          </FormUi.Input>
        </FormUi.Group>

        <FormUi.Group>
          <FormUi.Input
            value={cep}
            placeholder="CEP"
            type="text"
            label="CEP"
            name="cep"
            id="cep"
            minLength="8"
            required
          >
            <MaskedInput
              mask={maskCep}
              placeholder="12345-678"
              onChange={e => {
                setCep(e.target.value.replace('-', ''));
              }}
            />
          </FormUi.Input>

          <ButtonUi
            type="button"
            onClick={() => {
              handleAutoCompleteAddressByCEP();
            }}
          >
            <FaSearch />
            Encontre pelo CEP
          </ButtonUi>

          <FormUi.Input
            value={street}
            onChange={e => setStreet(e.target.value)}
            placeholder="Rua"
            label="Rua"
            type="text"
            name="street"
            id="street"
            required
          />

          <FormUi.Input
            value={number}
            onChange={e => setNumber(e.target.value)}
            placeholder="Nº"
            label="Número"
            type="text"
            name="number"
            id="number"
            fluid
            required
          />
        </FormUi.Group>

        <FormUi.Group>
          <FormUi.Input
            value={neighborhood}
            onChange={e => setNeighborhood(e.target.value)}
            placeholder="Bairro"
            type="text"
            label="Bairro"
            name="neighborhood"
            id="neighborhood"
            required
          />

          <FormUi.Input
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Cidade"
            label="Cidade"
            type="text"
            name="city"
            id="city"
            required
          />
        </FormUi.Group>
        <FormUi.Group>
          <ButtonUi content="Cadastrar" type="submit" primary />
        </FormUi.Group>
      </FormUi>
    </Container>
  );
};

export default UserInsert;
