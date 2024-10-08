import React, { useState, useEffect, useRef, useCallback } from 'react';
import './style.css';

import { debounce } from '@utils';
import { SEARCH_BAR_PLACEHOLDER } from '@constants';

import NoResult from '@views/Search/components/NoResult';
import UserCard from '@views/Search/components/UserCard';

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
    const [filteredData, setFilteredData] = useState<Item[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const debouncedFilter = useCallback(
        debounce((searchQuery: string) => {
        const searchQueryLower = searchQuery.toLowerCase();
          const filtered = data.filter(item => {
            return (
              item.id.toLowerCase().includes(searchQueryLower) ||
              item.name.toLowerCase().includes(searchQueryLower) ||
              item.address.toLowerCase().includes(searchQueryLower) ||
              item.pincode.includes(searchQueryLower) ||
              item.items.some(subItem => subItem.toLowerCase().includes(searchQueryLower))
            );
          });
          console.log("filtered:",filtered)
          setFilteredData(filtered);
        }, 300), // 300 ms debounce delay
        [data]
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.trim()
        setQuery(searchValue);
        debouncedFilter(searchValue);
        setHighlightedIndex(-1); // Reseting highlighted index for new search query
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

    // const filteredData = data.filter(item => {
    //     return (
    //         item.id.toLowerCase().includes(query.toLowerCase()) ||
    //         item.name.toLowerCase().includes(query.toLowerCase()) ||
    //         item.address.toLowerCase().includes(query.toLowerCase()) ||
    //         item.pincode.includes(query) ||
    //         item.items.some(subItem => subItem.toLowerCase().includes(query.toLowerCase()))
    //     );
    // });

    const handleMouseEnter = (index:number) => {
        setHighlightedIndex(index)
    }

    useEffect(() => {
        if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
          itemRefs.current[highlightedIndex]?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }
      }, [highlightedIndex]);

    return (
        <div className="container" onKeyDown={handleKeyDown}>
            <input
                type="text"
                placeholder={SEARCH_BAR_PLACEHOLDER}
                value={query}
                onChange={handleSearch}
                className="search-input"
            />
            {
                query && (
                    <div className="results-list">
                        {filteredData.length ? (
                            filteredData.map((user, index) => (
                                <div key={user.id} ref={el => (itemRefs.current[index] = el)}>
                                    <UserCard
                                        user={user}
                                        index={index}
                                        query={query}
                                        isHighlighed={index === highlightedIndex}
                                        onMouseEnter={handleMouseEnter}
                                    />
                                </div>
                            ))
                        ) : (
                            <NoResult />
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default SearchBar;
