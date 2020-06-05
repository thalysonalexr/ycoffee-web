import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/pt-br';

import { useAlert } from '../../contexts/alert';

import Loading from '../../components/Loading';
import FormSearch from '../../components/FormSearch';
import Pagination from '../../components/Pagination';

import { CoffeeModel, PaginationCoffees } from '../../types/domain/Coffee';

import {
  getAllCoffeesByUser,
  destroyCoffeeById,
} from '../../services/api-core';

import trash from '../../assets/icons/trash.svg';
import pencil from '../../assets/icons/pencil.svg';
import actions from '../../assets/icons/engineering.svg';
import calendar from '../../assets/icons/calendar.svg';
import coffee from '../../assets/icons/coffee-sm.svg';
import bad from '../../assets/icons/bad.svg';

import './styles.css';

const ListCoffees: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Oops! Nada para ver');

  const { setMessageAlert, hideAlert } = useAlert();

  const [coffees, setCoffees] = useState([] as CoffeeModel[]);

  async function listAllCoffees(page: number = 1) {
    setIsLoading(true);

    try {
      const {
        data: { pages, coffees },
      } = await getAllCoffeesByUser<PaginationCoffees>({
        page,
      });

      setPage(page);
      setTotalPages(pages);
      setIsLoading(false);

      return coffees;
    } catch (err) {}
  }

  async function handleDestroyCoffee(id: string) {
    setIsLoading(true);

    try {
      await destroyCoffeeById(id);
      setCoffees(coffees.filter((coffee) => coffee.id !== id));
      setMessageAlert('Receita removida com sucesso!', 'success');
      hideAlert(3000);
    } catch {
      setMessageAlert('Erro ao remover receita', 'danger');
      hideAlert(3000);
    } finally {
      setIsLoading(false);
    }
  }

  const prevPage = async () => {
    if (page === 1) return;

    const pageNumber = page - 1;
    const coffees = await listAllCoffees(pageNumber);

    setCoffees(coffees || []);
  };

  const nextPage = async () => {
    if (page === totalPages) return;

    const pageNumber = page + 1;
    const coffees = await listAllCoffees(pageNumber);

    setCoffees(coffees || []);
  };

  async function listSearchedCoffees(query: string, input: string) {
    try {
      const { data } = await getAllCoffeesByUser<{ coffees: CoffeeModel[] }>({
        query,
        input,
      });

      setCoffees(data.coffees);

      setMessage(`Nenhum café encontrado para "${input}"`);
    } catch {
      setMessage(`Nenhum café encontrado para "${input}"`);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;

    listAllCoffees()
      .then((coffees) => {
        if (isSubscribed) setCoffees(coffees || []);
      })
      .finally(() => setIsLoading(false));

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <section className="list-coffees">
      <Loading loading={isLoading} />
      <FormSearch callback={listSearchedCoffees} />
      {coffees.length > 0 ? (
        <table className="list-coffees shadow-box">
          <thead>
            <tr>
              <th className="index">#</th>
              <th className="type">
                <img src={coffee} alt="Icone de Café" />
                tipo do café
              </th>
              <th className="updatedat">
                <img src={calendar} alt="Icone de Calendário" />
                atualizado em
              </th>
              <th className="actions">
                <img src={actions} alt="Icone de Engrenagem" />
                ações
              </th>
            </tr>
          </thead>
          <tbody>
            {coffees.map((coffee: CoffeeModel, index: number) => (
              <tr key={coffee.id}>
                <td className="index">{index + 1}</td>
                <td className="type">{coffee.type}</td>
                <td className="updatedat">
                  <Moment
                    format="DD-MM-YYYY hh:mm:ss a"
                    date={coffee.updatedAt}
                  />
                </td>
                <td className="actions">
                  <Link to={{ pathname: `/app/coffees/edit/${coffee.id}` }}>
                    <img src={pencil} alt="Icone de Lápis" />
                  </Link>
                  <button
                    onClick={() => handleDestroyCoffee(coffee.id)}
                    title="Remover receita de café"
                  >
                    <img src={trash} alt="Icone de Lixeira" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="wrapper-message shadow-box">
          <div className="not-found">
            <p>{message}</p>
            <img src={bad} alt="Emoji triste" />
          </div>
        </div>
      )}
      {coffees.length ? (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          callbackNextPage={nextPage}
          callbackPrevPage={prevPage}
        />
      ) : null}
    </section>
  );
};

export default ListCoffees;
