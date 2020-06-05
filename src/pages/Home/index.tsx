import React, { useState, useEffect } from 'react';

import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';
import CardCoffee from './CardCoffee';
import Loading from '../../components/Loading';
import FormSearch from '../../components/FormSearch';
import Pagination from '../../components/Pagination';

import { CoffeeModel } from '../../types/domain/Coffee';

import api, { getAllCoffees } from '../../services/api-core';

import bad from '../../assets/icons/bad.svg';

import './styles.css';

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Oops! Nada para ver');

  const [coffees, setCoffees] = useState([] as CoffeeModel[]);

  async function listAllCoffees(page: number = 1) {
    setIsLoading(true);

    const { data } = await api.get(`/coffees?page=${page}`);

    setPage(page);
    setTotal(data.total);
    setTotalPages(data.pages);

    setIsLoading(false);

    return data.coffees;
  }

  const prevPage = async () => {
    if (page === 1) return;

    const pageNumber = page - 1;
    const coffees = await listAllCoffees(pageNumber);

    setCoffees(coffees);
  };

  const nextPage = async () => {
    if (page === totalPages) return;

    const pageNumber = page + 1;
    const coffees = await listAllCoffees(pageNumber);

    setCoffees(coffees);
  };

  async function listSearchedCoffees(query: string, input: string) {
    setIsLoading(true);

    try {
      const { data } = await getAllCoffees<{ coffees: CoffeeModel[] }>(
        query,
        input
      );

      setCoffees(data.coffees);

      setMessage(`Nenhum café encontrado para "${input}"`);
    } catch {
      setMessage(`Nenhum café encontrado para "${input}"`);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    listAllCoffees()
      .then((coffees) => setCoffees(coffees))
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="feed-coffees">
        <Header />
        <div className="wrapper">
          <FormSearch callback={listSearchedCoffees} />
          <Loading loading={isLoading} message="buscando receitas de café" />
          <span className="info-total">
            Mostrando {coffees.length} no total de {total} receitas
          </span>
          {coffees.length > 0 ? (
            <div className="card-coffees">
              {coffees.map((coffee: CoffeeModel) => (
                <CardCoffee key={coffee.id} coffee={coffee} />
              ))}
            </div>
          ) : (
            <div className="wrapper-message">
              <span className="not-found">{message}</span>
              <img src={bad} alt="Emoji triste" />
            </div>
          )}
        </div>
        {coffees.length ? (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            callbackNextPage={nextPage}
            callbackPrevPage={prevPage}
          />
        ) : null}
      </main>
      <Footer />
    </>
  );
};

export default Home;
