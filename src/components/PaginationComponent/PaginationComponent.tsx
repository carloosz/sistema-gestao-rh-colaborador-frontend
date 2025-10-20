import React, { Dispatch, SetStateAction } from 'react';
import ReactPaginate from 'react-paginate';
import './styles.css';
import { twMerge } from 'tailwind-merge';

interface Props {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  total: number;
  pageSize: number;
  pageCount: number;
}

const PaginationComponent = ({
  page,
  setPage,
  total,
  pageSize,
  pageCount,
}: Props) => {
  const initial_page = page - 1;
  const prev_disabled = page - 1 === 0;
  const next_disabled = page - 1 === 0;
  const page_items =
    total < pageSize || pageCount === page ? total : pageSize * page;
  const content = `Mostrando ${page_items} de ${total}`;

  const handlePage = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  return (
    <div className="flex items-center gap-[16px] justify-end">
      <span className="text-[16px] font-normal text-white">{content}</span>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={6}
        onPageChange={handlePage}
        initialPage={initial_page}
        className={twMerge(
          'pagination flex items-center self-end list-none',
          prev_disabled ? 'disabled' : '',
          next_disabled ? 'disabled' : '',
        )}
      />
    </div>
  );
};

export default PaginationComponent;
