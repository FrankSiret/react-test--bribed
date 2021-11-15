import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { IRootState } from '../../shared/reducers';
import { Button, Space, Table, Tag } from 'antd';

import { getEntities } from './bribed.reducer';
import { IBribed, ISolutionBribed } from '../../shared/model/bribed.model';
import { ColumnsType } from 'antd/lib/table';

import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { EntityHeader } from 'src/shared/components/entityComponents';

import './bribed.scss';

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
        `${data.bribed} bribes`
      ) : (
        <Tag color='volcano' >
          Too Chaotic
        </Tag>
      )}
    </div>
  )

  const renderQueue = (data: number[]) => (
    <div title={JSON.stringify(data)}>
      {Array.isArray(data) && data.findIndex(v => typeof v !== 'number' || v < 1) === -1
        ? data.join(', ')
        : 'Error'
      }
    </div>
  )

  const renderActionButtons = (record: IBribed) => (
    <Space size="small" >
      <Button
        title="Detail problem"
        shape="circle"
        type="dashed"
      >
        <NavLink to={`${match.url}/${record._id}`} >
          <EyeOutlined />
        </NavLink>
      </Button>
      <Button
        title="Edit problem"
        shape="circle"
        className="warning"
      >
        <NavLink to={`${match.url}/${record._id}/edit`} >
          <EditOutlined />
        </NavLink>
      </Button>
      <Button
        title="Delete problem"
        shape="circle"
        danger
      >
        <NavLink to={`${match.url}/${record._id}/delete`} >
          <DeleteOutlined />
        </NavLink>
      </Button>
    </Space >
  )

  const columns = [
    {
      title: 'Queue',
      dataIndex: 'queue',
      key: 'queue',
      render: (data: number[]) => renderQueue(data),
    },
    {
      title: 'Number of bribed',
      dataIndex: 'solution',
      key: 'solution',
      render: (data: ISolutionBribed) => renderNumberOfBribed(data)
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: IBribed) => renderActionButtons(record),
    },
  ];

  return (
    <div className="app-page bribed">
      <div className="site-layout-content">
        <EntityHeader
          title="Bribed Problem"
          addRoute={`${match.url}/new`}
          update={handleSyncList}
        />
        <Table
          rowKey={(data) => data._id ?? ''}
          className="bribed-table"
          size="small"
          loading={loading}
          columns={columns}
          dataSource={bribedList}
          pagination={{ position: ['bottomCenter'], size: 'small', total: totalItems }}
        />
      </div>
    </div>
  );
};

export default Bribed;
