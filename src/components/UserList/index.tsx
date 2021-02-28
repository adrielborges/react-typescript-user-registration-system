import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';

import MaskedInput from 'react-input-mask';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import maskCep from '../../utils/expressions/maskCep';
import maskCpf from '../../utils/expressions/maskCpf';

import {
  Container,
  ModalEdit,
  FormUi,
  ButtonUi,
  TableUi,
  FaEditSvg,
  FaTrashSvg,
  FaSearchSvg,
} from './styles';
import apiCep from '../../services/apiCep';
import Menu from '../Menu';

interface IuserList {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  endereco: {
    cep: number;
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
  };
}

const UserList: React.FC = () => {
  const [listUsers, setListUsers] = useState<IuserList[]>([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('Carregando...');

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');

  const [loadEditUser, setLoadEditUser] = useState<IuserList>({
    id: '',
    nome: '',
    cpf: '',
    email: '',
    endereco: {
      cep: 0,
      rua: '',
      numero: 0,
      bairro: '',
      cidade: '',
    },
  });

  const toastElement = (message: string) => toast.success(message);
  const toastElementError = (message: string) => toast.error(message);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('@userSystem:token');
    if (!token) {
      return history.push('/');
    }
    return console.log('Token ainda válido, Seja bem vindo');
  }, [history]);

  useEffect(() => {
    let isCancelled = false;

    const loadUsers = async () => {
      const response = await api.get('/usuarios');
      if (!isCancelled) {
        setListUsers(response.data);
        if (listUsers.length === 0) {
          setStatus('Lista vazia');
        }
      }
    };

    loadUsers();

    return () => {
      isCancelled = true;
    };
  }, [listUsers.length]);

  const loadUsers = async () => {
    const response = await api.get('/usuarios');
    setListUsers(response.data);
    if (listUsers.length === 0) {
      setStatus('Lista vazia');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/usuarios/${id}`);
      loadUsers();
      toastElement('Usuário deletado com sucesso!');
    } catch (error) {
      toastElementError('Erro ao deletar o usuário!');
    }
  };
  const handleLoadEditValue = () => {
    setName(loadEditUser.nome);
    setCpf(loadEditUser.cpf);
    setEmail(loadEditUser.email);
    setCep(loadEditUser.endereco.cep.toString());
    setStreet(loadEditUser.endereco.rua);
    setNumber(loadEditUser.endereco.numero.toString());
    setNeighborhood(loadEditUser.endereco.bairro);
    setCity(loadEditUser.endereco.cidade);
  };

  const handleEdit = async (id: string) => {
    try {
      const newForm = {
        id,
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

      await api.put(`/usuarios/${id}`, newForm);

      loadUsers();
      toastElement('Usuário editado com sucesso!');
    } catch (error) {
      toastElementError('Erro ao editar o usuário!');
    }
  };

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

  return (
    <Container>
      <Menu page="user" />
      <ToastContainer />
      {!open ? null : (
        <ModalEdit>
          <div>
            <FormUi>
              <h2>Editar Usuário</h2>
              <br />
              <FormUi.Group>
                <FormUi.Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={loadEditUser.nome}
                  type="name"
                  label="Nome"
                  name="name"
                  id="editName"
                  required
                />

                <FormUi.Input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={loadEditUser.email}
                  label="Email"
                  type="email"
                  name="email"
                  id="editEmail"
                  required
                />

                <FormUi.Input
                  value={cpf}
                  label="CPF"
                  type="text"
                  name="cpf"
                  id="editCpf"
                  minLength="11"
                  required
                >
                  <MaskedInput
                    mask={maskCpf}
                    placeholder={loadEditUser.cpf}
                    onChange={e => setCpf(e.target.value)}
                  />
                </FormUi.Input>
              </FormUi.Group>

              <FormUi.Group>
                <FormUi.Input
                  value={cep}
                  type="text"
                  label="CEP"
                  name="cep"
                  id="editCep"
                  minLength="8"
                  required
                >
                  <MaskedInput
                    mask={maskCep}
                    placeholder={loadEditUser.endereco.cep.toString()}
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
                  <FaSearchSvg />
                  Encontre pelo CEP
                </ButtonUi>

                <FormUi.Input
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  placeholder={loadEditUser.endereco.rua}
                  label="Rua"
                  type="text"
                  name="street"
                  id="editStreet"
                  required
                />

                <FormUi.Input
                  value={number}
                  onChange={e => setNumber(e.target.value)}
                  placeholder={loadEditUser.endereco.numero}
                  label="Número"
                  type="text"
                  name="number"
                  id="editNumber"
                  fluid
                  required
                />
              </FormUi.Group>

              <FormUi.Group>
                <FormUi.Input
                  value={neighborhood}
                  onChange={e => setNeighborhood(e.target.value)}
                  placeholder={loadEditUser.endereco.bairro}
                  type="text"
                  label="Bairro"
                  name="neighborhood"
                  id="editNeighborhood"
                  required
                />

                <FormUi.Input
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder={loadEditUser.endereco.cidade}
                  label="Cidade"
                  type="text"
                  name="city"
                  id="editCity"
                  required
                />
              </FormUi.Group>
              <FormUi.Group>
                <ButtonUi color="red" onClick={() => setOpen(false)}>
                  Cancelar
                </ButtonUi>
                <ButtonUi
                  content="Editar"
                  labelPosition="right"
                  icon="checkmark"
                  onClick={() => {
                    setOpen(false);
                    handleEdit(loadEditUser.id);
                  }}
                  positive
                />
              </FormUi.Group>
            </FormUi>
          </div>
        </ModalEdit>
      )}

      {!listUsers.length ? (
        status
      ) : (
        <TableUi celled>
          <TableUi.Header>
            <TableUi.Row>
              <TableUi.HeaderCell>Nome</TableUi.HeaderCell>
              <TableUi.HeaderCell>CPF</TableUi.HeaderCell>
              <TableUi.HeaderCell>Email</TableUi.HeaderCell>
              <TableUi.HeaderCell>Cidade</TableUi.HeaderCell>
              <TableUi.HeaderCell>Ações</TableUi.HeaderCell>
            </TableUi.Row>
          </TableUi.Header>

          <TableUi.Body>
            {listUsers.map(listUser => (
              <TableUi.Row key={listUser.id}>
                <TableUi.Cell>{listUser.nome}</TableUi.Cell>
                <TableUi.Cell>{listUser.cpf}</TableUi.Cell>
                <TableUi.Cell>{listUser.email}</TableUi.Cell>
                <TableUi.Cell>{listUser.endereco.cidade}</TableUi.Cell>
                <TableUi.Cell>
                  <FaEditSvg
                    onClick={() => {
                      setLoadEditUser(listUser);
                      handleLoadEditValue();
                      setOpen(true);
                    }}
                  />
                  <FaTrashSvg onClick={() => handleDelete(listUser.id)} />
                </TableUi.Cell>
              </TableUi.Row>
            ))}
          </TableUi.Body>
        </TableUi>
      )}
    </Container>
  );
};

export default UserList;
