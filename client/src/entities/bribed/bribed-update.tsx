import React, { useState, useEffect } from 'react';
import { Form, Collapse, Divider, Row } from 'antd';
import { useHistory, useRouteMatch } from 'react-router';

import { getEntity, updateEntity, createEntity, TDataType } from './bribed.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from "../../shared/reducers";
import { EntityLoading, EntityHeader, EntityButtons } from '../../shared/components/entityComponents';
import { ENTITY_ROUTE } from '../../config/constants';

export const BribedUpdate = () => {
  const dispatch = useDispatch();

  const bribedEntity = useSelector((state: IRootState) => state.bribed?.entity);
  const loading = useSelector((state: IRootState) => state.bribed?.loading);
  const updating = useSelector((state: IRootState) => state.bribed?.updating);
  const updateSuccess = useSelector((state: IRootState) => state.bribed?.updateSuccess);

  const match = useRouteMatch<{ id: string }>()
  const history = useHistory();

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

  const saveEntity = (values: any) => {

    const entity: TDataType = {
      ...bribedEntity,
      ...values,
    };

    const id = match.params.id;
    dispatch(updateEntity(id, entity));
    return;
  };

  const defaultValues = () => ({
    ...bribedEntity,
  });

  return (
    <div>
      <EntityHeader title="Edit problem" />
      <div className="entity-content">
        {loading ? (
          <EntityLoading />
        ) : (
          <Form layout="vertical" onFinish={saveEntity} initialValues={defaultValues()}>

            <EntityButtons updating={updating} />
          </Form>
        )}
      </div>
    </div>
  );
};

export default BribedUpdate;
