import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';

import { EntityDeleteModal } from '../../shared/components/entityComponents';
import { getEntity, deleteEntity } from './bribed.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from "../../shared/reducers";

export const AgrupadorDeleteDialog = () => {
  const dispatch = useDispatch();

  const match = useRouteMatch<{ id: string }>()
  const history = useHistory()

  useEffect(() => {
    dispatch(getEntity(match.params.id));
  }, []);

  const bribedEntity = useSelector((state: IRootState) => state.bribed?.entity)
  const loading = useSelector((state: IRootState) => state.bribed?.loading);
  const updating = useSelector((state: IRootState) => state.bribed?.updating);
  const updateSuccess = useSelector((state: IRootState) => state.bribed?.updateSuccess);

  const handleClose = () => {
    history.goBack();
  };

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    bribedEntity?._id && dispatch(deleteEntity(bribedEntity?._id));
  };

  return (
    <EntityDeleteModal
      title={"Confirm to delete problem"}
      confirmDelete={confirmDelete}
      handleClose={handleClose}
      loading={loading}
      updating={updating}
    >
      Are you sure you want to delete this problem?
    </EntityDeleteModal>
  );
};

export default AgrupadorDeleteDialog;
