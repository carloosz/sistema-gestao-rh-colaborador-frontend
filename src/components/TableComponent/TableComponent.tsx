import React, { Dispatch, SetStateAction } from 'react';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import { twMerge } from 'tailwind-merge';

interface Props {
  headers: IHeader[];
  rows: IRow[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  total?: number;
  pageSize?: number;
  pageCount?: number;
  hasSelectCheckbox?: boolean;
  handleSelectAll?: () => void;
  handleView?: (id: string) => void;
  handleEdit?: (id: string) => void;
  handleToggle?: (id: string, bool: boolean) => void;
  handleDownload?: (url: string) => void;
  handleDownloadMany?: (urls: string[]) => void;
  handleDelete?: (id: string) => void;
  handleSort?: (name: string, sort?: string) => void;
}

export interface IHeader {
  name: string;
  sort?: string;
  width?: string;
}

export interface IRow {
  id: string;
  active: boolean;
  data: IData[];
  download?: string;
}

export interface IData {
  text: string;
  width?: string;
}

const TableComponent = ({
  headers,
  rows,
  page,
  setPage,
  total = 0,
  pageSize = 10,
  pageCount = 1,
  handleView,
  handleEdit,
  handleDownload,
  handleDelete,
  handleSort,
}: Props) => {
  return (
    <div className="flex flex-col gap-[16px">
      <div className="m-h-[38rem]">
        <table className="table-fixed min-w-[1200px] w-full">
          <thead>
            <tr>
              {headers?.map((header, index) => (
                <th
                  key={index}
                  className={twMerge(
                    'pb-[15px]! whitespace-nowrap',
                    header?.width
                      ? `min-w-[${header?.width}] max-w-[${header?.width}] `
                      : '',
                  )}
                >
                  <span
                    className={twMerge(
                      `flex items-center text-center p-[15px_24px]! text-[16px] font-normal text-secondary bg-primary`,
                      index === 0 ? 'rounded-l-[10px]' : '',
                    )}
                  >
                    {header.name}{' '}
                    {header.sort && handleSort && (
                      <button
                        className="border-none bg-transparent"
                        type="button"
                        onClick={() => handleSort(header?.name, header?.sort)}
                      >
                        <img
                          width={12}
                          height={12}
                          src="/img/icons/arrow.svg"
                          alt="Seta"
                        />
                      </button>
                    )}
                  </span>
                </th>
              ))}
              <th
                className={`flex items-center justify-center text-center p-[15px_24px]! text-[16px] font-normal text-secondary bg-primary rounded-r-[10px]`}
              >
                Ver Detalhes
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, index) => (
              <tr key={`tr_${index}`}>
                {row.data.map((info, index2) => (
                  <td
                    key={`td_${index}_${index2}`}
                    className={'pb-[15px]!'}
                    title={info?.text}
                  >
                    <span
                      className={twMerge(
                        'bg-primary block text-[16px] font-normal text-white h-[32px] p-[7px_24px]! whitespace-nowrap text-ellipsis overflow-hidden',
                        info?.width
                          ? `m-w-[${info?.width}] max-w-[${info?.width}] w-[${info?.width}]`
                          : `w-full`,
                        index2 === 0 ? 'rounded-l-[10px]' : '',
                      )}
                    >
                      {info?.text}
                    </span>
                  </td>
                ))}
                <td className="text-[16px] font-normal text-white h-[56px] w-full pb-[15px]!">
                  <div className="flex h-[32px] justify-center items-center gap-[16px] bg-primary rounded-r-[10px] p-[7px_24px]!">
                    {handleView && (
                      <button
                        className="border-none bg-transparent"
                        type="button"
                        onClick={() => handleView(row.id)}
                      >
                        <img
                          width={24}
                          height={24}
                          src="/img/icons/eye_white.svg"
                          alt="Vizualizar"
                        />
                      </button>
                    )}
                    {handleEdit && (
                      <button
                        className="border-none bg-transparent"
                        type="button"
                        onClick={() => handleEdit(row?.id)}
                      >
                        <img
                          width={24}
                          height={24}
                          src="/img/icons/edit.svg"
                          alt="Editar"
                        />
                      </button>
                    )}
                    {handleDelete && (
                      <button
                        className="border-none bg-transparent"
                        type="button"
                        onClick={() => handleDelete(row?.id)}
                      >
                        <img
                          width={24}
                          height={24}
                          src="/img/icons/trash.svg"
                          alt="Lixeira"
                        />
                      </button>
                    )}
                    {handleDownload && (
                      <button
                        className="border-none bg-transparent"
                        type="button"
                        onClick={() => {
                          if (row?.download) {
                            handleDownload(row?.download);
                          }
                        }}
                      >
                        <img
                          width={24}
                          height={24}
                          src="/img/icons/download.svg"
                          alt="Download"
                        />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationComponent
        page={page}
        setPage={setPage}
        total={total}
        pageSize={pageSize}
        pageCount={pageCount}
      />
    </div>
  );
};

export default TableComponent;
