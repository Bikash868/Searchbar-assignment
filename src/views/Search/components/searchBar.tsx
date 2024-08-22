import React, { useState } from 'react';
import classNames from 'classnames';
import './style.css';
import { SEARCH_BAR_PLACEHOLDER } from  '@constants';

type Item = {
    id: string;
    name: string;
    items: string[];
    address: string;
    pincode: string;
};  

type Props = {
  data: Item[];
};

const SearchBar: React.FC<Props> = ({ data }) => {
  const [query, setQuery] = useState<string>('');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex(prev => (prev < filteredData.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      alert(`Selected: ${filteredData[highlightedIndex].name}`);
    }
  };

  const filteredData = data.filter(item => {
    return (
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.address.toLowerCase().includes(query.toLowerCase()) ||
      item.pincode.includes(query) ||
      item.items.some(subItem => subItem.toLowerCase().includes(query.toLowerCase()))
    );
  });

  const highlightText = (text: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div class="container" onKeyDown={handleKeyDown}>
      <input
        type="text"
        placeholder={SEARCH_BAR_PLACEHOLDER}
        value={query}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="results-list">
        {filteredData.length ? (
          filteredData.map((item, index) => (
            <div
              key={item.id}
              className={classNames('result-item', {
                'highlighted-item': index === highlightedIndex,
              })}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => alert(`Selected: ${item.name}`)}
            >
              <div className="item-id">{highlightText(item.id)}</div>
              <div className="name">{highlightText(item.name)}</div>
              {query &&
                item.items.some(subItem =>
                  subItem.toLowerCase().includes(query.toLowerCase())
                ) && <div className="item-found">{`${query} found in items`}</div>}
              <div className="address">{highlightText(item.address)}</div>
            </div>
          ))
        ) : (
          <div className="result-item empty">No results found</div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
