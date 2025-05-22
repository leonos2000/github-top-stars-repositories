import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import debounce from 'lodash/debounce';
import { DEFAULT_DEBOUNCE_INTERVAL, DEFAULT_QUERY } from '@/constants';

interface RepositoriesSearchProps extends SearchProps {
  onSearch: (value: string) => void;
}

export const RepositoriesSearch: FC<RepositoriesSearchProps> = ({ onSearch, ...props }) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useMemo(
    () => debounce((nextValue: string) => onSearch(nextValue), DEFAULT_DEBOUNCE_INTERVAL),
    [onSearch]
  );

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.persist();
      const { value } = event.target;
      setInputValue(value);
      debouncedSearch(value || DEFAULT_QUERY);
    },
    [debouncedSearch]
  );

  const handleClear = useCallback(() => {
    setInputValue('');
  }, []);

  return (
    <Input
      value={inputValue}
      placeholder={`Example search: ${DEFAULT_QUERY}`}
      onChange={handleSearch}
      allowClear
      onClear={handleClear}
      {...props}
    />
  );
};
