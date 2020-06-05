import React, { useState, useRef, FormEvent, useEffect } from 'react';
import { useHistory, match } from 'react-router-dom';
import axios from 'axios';

import { useAlert } from '../../contexts/alert';
import { useUpload } from '../../contexts/upload';

import Upload from '../../components/Upload';
import Loading from '../../components/Loading';
import FileInfo from '../../components/FileInfo';

import {
  getCoffeeById,
  updateCoffee,
  destroyCoffeeById,
} from '../../services/api-core';
import { CoffeeModel } from '../../types/domain/Coffee';

import add from '../../assets/icons/add.svg';
import trash from '../../assets/icons/trash-white.svg';
import coffeeBean from '../../assets/icons/coffee-bean-bordered.svg';

import './styles.css';

interface Props {
  match: match<{ id: string }>;
}

const EditAccount: React.FC<Props> = ({ match: { params } }) => {
  const history = useHistory();
  const inputIngredient = useRef({} as HTMLInputElement);

  const { setMessageAlert, hideAlert } = useAlert();
  const {
    uploadedFile,
    handleUpload,
    processUploadCoffee,
    cleanupUploadFile,
  } = useUpload();

  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [preparation, setPreparation] = useState('');
  const [ingredients, setIngredients] = useState([] as string[]);
  const [timePrepare, setTimePrepare] = useState<string | number>('');
  const [portions, setPortions] = useState<string | number>('');

  const [isLoading, setIsLoading] = useState(false);

  function addIngredient(ingredient: string) {
    if (!ingredient) {
      setMessageAlert('Digite o nome do ingrediente', 'danger');
      hideAlert(3000);
      return;
    }

    setIngredients([...ingredients, ingredient]);
    inputIngredient.current.value = '';
    inputIngredient.current.focus();
  }

  function removeIngredient(index: number) {
    setIngredients(ingredients.filter((_, i) => index !== i));
  }

  async function handleUpdateCoffee(e: FormEvent) {
    e.preventDefault();

    if (!ingredients.length) {
      setMessageAlert('Insira os ingredientes da receita.', 'danger');
      hideAlert(3000);
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await updateCoffee<{ coffee: CoffeeModel }>(id, {
        type,
        description,
        preparation,
        ingredients,
        timePrepare: timePrepare ? timePrepare : undefined,
        portions: portions ? portions : undefined,
      });

      if (uploadedFile) {
        processUploadCoffee(data.coffee.id, uploadedFile.file);

        if (uploadedFile.error) {
          setMessageAlert(
            'Ocorreu um erro ao fazer upload da imagem',
            'danger'
          );
        }
      }

      setMessageAlert('Alterações salvas com sucesso', 'success');
      hideAlert(3000);
    } catch ({ response: { status } }) {
      status === 400
        ? setMessageAlert(
            'As informações inseridas estão incorretas.',
            'danger'
          )
        : setMessageAlert('Erro ao atualizar informações.', 'danger');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDestroyCoffee() {
    setIsLoading(true);

    try {
      await destroyCoffeeById(id);
      setMessageAlert('Receita removida com sucesso!', 'success');

      setTimeout(() => {
        hideAlert(0);
        setIsLoading(false);
        history.push('/app/coffees');
      }, 2000);
    } catch {
      setMessageAlert('Erro ao remover receita', 'danger');
      hideAlert(3000);
    }
  }

  useEffect(() => {
    setIsLoading(true);

    async function handleGetCoffeeById(id: string) {
      return await getCoffeeById<{ coffee: CoffeeModel }>(id);
    }

    handleGetCoffeeById(params.id)
      .then(({ data: { coffee } }) => {
        setId(coffee.id);
        setType(coffee.type);
        setDescription(coffee.description);
        setPreparation(coffee.preparation);
        setIngredients(coffee.ingredients);
        setTimePrepare(coffee.timePrepare ?? '');
        setPortions(coffee.portions ?? '');

        if (coffee.image) {
          const { image } = coffee;
          const urlImage = `${process.env.REACT_APP_API}/files/${image.key}`;

          axios.get(urlImage, { responseType: 'blob' }).then(({ data }) => {
            const file = new File([data], image.name);
            handleUpload([file]);
          });
        }
      })
      .catch(() => history.push('/app/coffees'))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => cleanupUploadFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="edit-coffee shadow-box">
      <Loading loading={isLoading} />
      <form onSubmit={handleUpdateCoffee}>
        <div className="header">
          <legend>
            <strong>{type}</strong>
            <img src={coffeeBean} alt="Icone de grão de café" />
          </legend>
          <button
            onClick={() => handleDestroyCoffee()}
            type="button"
            title="Remover receita"
            className="remove shadow-box"
          >
            <img src={trash} alt="Icone de lixeira" />
          </button>
        </div>
        <div className="wrapper">
          <div className="left">
            <label htmlFor="type">Tipo do café</label>
            <div className="wrapper-input">
              <input
                id="type"
                required
                autoFocus
                type="text"
                value={type}
                maxLength={45}
                title="Insira seu o tipo do café"
                placeholder="Ex: café caseiro com canela e leite"
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <label htmlFor="description">Descrição da receita</label>
            <div className="wrapper-input">
              <input
                id="description"
                required
                type="text"
                value={description}
                maxLength={255}
                title="Insira a descrição da receita"
                placeholder="Dica: chame a atenção para a sua receita!"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <label htmlFor="preparation">Modo de preparo</label>
            <div className="wrapper-input">
              <textarea
                id="preparation"
                cols={30}
                rows={10}
                required
                value={preparation}
                placeholder="Nos conte como preparar passo a passo!"
                onChange={(e) => setPreparation(e.target.value)}
              ></textarea>
            </div>
            <div className="inline">
              <div>
                <label htmlFor="time-prepare">Tempo de preparo</label>
                <div className="wrapper-input">
                  <input
                    id="time-prepare"
                    min={0}
                    value={timePrepare}
                    type="number"
                    placeholder="Ex: 2 minutos"
                    onChange={(e) => setTimePrepare(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="portions">Total de porções</label>
                <div className="wrapper-input">
                  <input
                    id="portions"
                    min={0}
                    value={portions}
                    type="number"
                    placeholder="Ex: 5 porções"
                    onChange={(e) => setPortions(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div>
              <label htmlFor="ingredients">Ingredientes</label>
              <div className="wrapper-input">
                <input
                  id="ingredients"
                  type="text"
                  maxLength={45}
                  ref={inputIngredient}
                  title="Insira o nome do ingrediente"
                  placeholder="Ex: 2x colheres de cacau em pó"
                />
                <button
                  type="button"
                  title="Adiconar ingrediente"
                  onClick={() => addIngredient(inputIngredient.current.value)}
                >
                  <img src={add} alt="Icone de adicionar" />
                </button>
              </div>
              <div className="list-ingredients">
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>
                      <button
                        className="shadow-box"
                        title="Clique para remover"
                        onClick={() => removeIngredient(index)}
                        type="button"
                      >
                        {ingredient}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="upload-image">
                <label>Imagem da receita</label>
                <Upload />
                <FileInfo />
              </div>
            </div>
            <button className="shadow-box" type="submit">
              salvar alterações
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EditAccount;
