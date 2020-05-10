import React, { useState } from 'react';
import { GrSearch } from 'react-icons/gr';

import './styles.css';

interface Callback {
  callback: (query: string, input: string) => void;
}

const FormSearch: React.FC<Callback> = ({ callback }) => {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('type');

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    callback(query, input);
  }

  return (
    <form
      className="form-search shadow-box"
      onSubmit={handleSearch}>
      <select
        title="Selecionar tipo de busca"
        className="query-search shadow-box"
        onChange={e => setQuery(e.target.value)}>
        <option value="type">tipo</option>
        <option value="preparation">preparo</option>
      </select>
      <input
        value={input}
        className="ipt-search"
        placeholder="buscar café..."
        onChange={e => setInput(e.target.value)}
        type="text" />
      <button
        title="Buscar agora!"
        className="send-search"
        type="submit">
        <span>Buscar</span>
        <GrSearch size={22} color="#412507" />
      </button>
    </form>
  );
}

export default FormSearch;
