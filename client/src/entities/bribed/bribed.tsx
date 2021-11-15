import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from '../../shared/reducers';
import { Table, Tag } from 'antd';

import { getEntities } from './bribed.reducer';
// import { ColumnsType } from 'antd/lib/table';
import { IBribed, ISolutionBribed } from '../../shared/model/bribed.model';

export const Bribed = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useDispatch();

  const bribedList = useSelector((state: IRootState) => state.bribed?.entities);
  const loading = useSelector((state: IRootState) => state.bribed?.loading);
  const totalItems = useSelector((state: IRootState) => state.bribed?.totalItems);
  const updateSuccess = useSelector((state: IRootState) => state.bribed?.updateSuccess);

  const getAllEntities = () => dispatch(getEntities());

  useEffect(() => {
    getAllEntities();
  }, [updateSuccess]);

  const handleSyncList = () => {
    getAllEntities();
  };

  const { match } = props;

  const renderNumberOfBribed = (data: ISolutionBribed) => (
    <div>
      {data?.bribed !== undefined ? (
        data.bribed
      ) : (
        <Tag color='volcano' >
          Too Chaotic
        </Tag>
      )}
    </div>
  )

  const columns = [
    {
      title: 'Queue',
      dataIndex: 'queue',
      key: 'queue',
      render: (data: number[]) => <div>{JSON.stringify(data)}</div>,
    },
    {
      title: 'Number of bribed',
      dataIndex: 'solution',
      key: 'solution',
      render: (data: ISolutionBribed) => renderNumberOfBribed(data)
    },
  ];

  return (
    <div className="app-page">
      <div className="site-layout-content">
        <Table dataSource={bribedList} columns={columns} />
      </div>
      {/* <TableComponent
        title={translate('cunaticWebApp.bribed.home.title')}
        ptitle={translate('cunaticWebApp.bribed.home.title')}
        header={[
          {
            key: 'name',
            title: translate('cunaticWebApp.bribed.name'),
          },
          {
            key: 'tipo',
            title: translate('cunaticWebApp.bribed.tipo'),
          },
        ]}
        loading={loading}
        itemData={bribedList}
        route={match.url}
        update={handleSyncList}
        paginationState={paginationState}
        handlePagination={handlePagination}
        totalItems={totalItems}
        nextPage={links.next}
        useSort={sort}
      /> */}
    </div>
  );
};

export default Bribed;
