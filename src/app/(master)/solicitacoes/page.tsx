'use client';

import TableComponent from '@/components/TableComponent/TableComponent';
import React, { useState } from 'react';
import { headers } from './fakedata';
import { useRouter } from 'next/navigation';
import protectedRoute from '@/hooks/protectedRoute';
import { useRequests } from '@/services/requests/requests/getRequests';
import { IRequestList } from '@/interfaces/Request';
import { useAuth } from '@/hooks/useAuth';
import ModalRequest from '@/components/Modals/ModalRequest/ModalRequest';
import Loading from '@/components/Loading/Loading';

const dataToRows = (data: IRequestList) => {
  return data?.requests?.map(item => ({
    id: item?.documentId,
    active: true,
    data: [
      { text: item?.id?.toString() },
      { text: item?.observation },
      { text: item?.createdAt?.slice(0, 10)?.split('-')?.reverse()?.join('/') },
      { text: item?.type || '-' },
      { text: item?.isFinished ? 'Finalizada' : 'Pendente' },
    ],
  }));
};

const RequestsPage = () => {
  const { myInfo } = useAuth();
  const [openCreateRequestModal, setOpenCreateRequestModal] = useState(false);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useRequests({
    page: currentPage,
    pageSize: 9,
  });

  return (
    <div className="flex flex-col pt-[37px]!">
      {(isFetching || !data) && <Loading />}
      {openCreateRequestModal && (
        <ModalRequest onClose={() => setOpenCreateRequestModal(false)} />
      )}
      <div className="flex flex-col">
        <span className="text-[40px] text-white font-normal">
          Bem vindo(a) {myInfo?.name}
        </span>
        <h1 className="text-[40px] text-primary font-normal">
          Minhas solicitações
        </h1>
      </div>
      <div className="w-full flex items-center justify-end mb-[32px]!">
        <button
          type="button"
          onClick={() => setOpenCreateRequestModal(true)}
          className="w-[335px] h-[50px] rounded-[10px] flex justify-center items-center gap-[24px] bg-primary2 text-white text-[24px] font-normal"
        >
          Nova solicitação
          <img
            width={32}
            height={32}
            src="/img/icons/plus_white.svg"
            alt="Adicionar"
          />
        </button>
      </div>
      {data?.requests?.length > 0 && (
        <TableComponent
          headers={headers}
          rows={dataToRows(data)}
          page={currentPage}
          setPage={setCurrentPage}
          total={data?.totalItems}
          handleView={(id: string) => router.push(`/solicitacoes/ver/${id}`)}
        />
      )}
    </div>
  );
};

export default protectedRoute(RequestsPage);
