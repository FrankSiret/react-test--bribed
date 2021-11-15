import React, { useState, useEffect } from 'react';
import { Form, Collapse, Divider, Row, Space, Input, Tooltip, Typography, Modal, Button, Alert } from 'antd';
import { useHistory, useRouteMatch } from 'react-router';

import { getEntity, updateEntity, createEntity, TDataType } from './bribed.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from "../../shared/reducers";
import { EntityLoading, EntityHeader, EntityButtons } from '../../shared/components/entityComponents';
import { ENTITY_ROUTE } from '../../config/constants';

import { EditOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import QueueSolution from './queue-solution';

export const BribedDetail = () => {
  const dispatch = useDispatch();

  const match = useRouteMatch<{ id: string }>()
  const history = useHistory();

  const bribedEntity = useSelector((state: IRootState) => state.bribed?.entity);
  const loading = useSelector((state: IRootState) => state.bribed?.loading);
  const updating = useSelector((state: IRootState) => state.bribed?.updating);
  const updateSuccess = useSelector((state: IRootState) => state.bribed?.updateSuccess);

  const handleClose = () => {
    history.push(ENTITY_ROUTE.BRIBED);
  };

  useEffect(() => {
    dispatch(getEntity(match.params.id));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  return (
    <div className="app-page bribed-detail">
      <div className="site-layout-content">
        <EntityHeader title="Problem" loading={loading} goBack />
        {loading ? (
          <EntityLoading />
        ) : (
          <div className="">
            {bribedEntity?.solution?.tooChaotic ? (
              <div className="display__too-chaotic">
                <Alert message={`Bribed ${JSON.stringify(bribedEntity.queue)}`} description="Too Chaotic" showIcon type="error" />
              </div>
            ) : (
              <div className="display__solution">
                <div className="display__solution__list">
                  {bribedEntity?.solution?.details?.reverse().map(({ queue, indexA, indexB }, index) => (
                    <div key={index} className="display__solution__list--index">
                      <QueueSolution {...{ queue, indexA, indexB }} />
                      {index === 0
                        ? <span>Initial state</span>
                        : queue && indexA && <span>number {queue[indexA - 1]} moves forward</span>
                      }
                    </div>
                  ))}
                </div>
                <Alert message={`Total of bribes: ${bribedEntity?.solution?.bribed}`} showIcon type="info" />
              </div>
            )}
            <Button type="primary">
              <NavLink to={`${match.url} /edit`}>
                <EditOutlined />
                Edit
              </NavLink>
            </Button>
          </div>
        )}
      </div>
    </div >
  );
};

export default BribedDetail;
