import React, { useState, useEffect } from 'react';
import { Form, Collapse, Divider, Row, Space, Input, Tooltip, Typography, Modal, Button } from 'antd';
import { useHistory, useRouteMatch } from 'react-router';

import { getEntity, updateEntity, createEntity, TDataType } from './bribed.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from "../../shared/reducers";
import { EntityLoading, EntityHeader, EntityButtons } from '../../shared/components/entityComponents';
import { ENTITY_ROUTE } from '../../config/constants';

import { SaveOutlined } from '@ant-design/icons';
import { Rule } from 'rc-field-form/lib/interface';

export const BribedUpdate = () => {
  const dispatch = useDispatch();

  const match = useRouteMatch<{ id: string }>()
  const history = useHistory();

  const [isNew] = useState(!match.params || !match.params.id);

  const bribedEntity = useSelector((state: IRootState) => state.bribed?.entity);
  const loading = useSelector((state: IRootState) => state.bribed?.loading);
  const updating = useSelector((state: IRootState) => state.bribed?.updating);
  const updateSuccess = useSelector((state: IRootState) => state.bribed?.updateSuccess);

  const handleClose = () => {
    history.push(ENTITY_ROUTE.BRIBED);
  };

  useEffect(() => {
    !isNew &&
      dispatch(getEntity(match.params.id));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = (values: any) => {
    const queue: number[] = values.queue.split(',').map((v: string) => {
      const t = +v.trim();
      return t;
    });

    if (isNew) {
      const entity: TDataType = {
        queue,
      };
      dispatch(createEntity(entity));
    }
    else {
      const entity: TDataType = {
        _id: bribedEntity?._id,
        queue,
      };
      const id = match.params.id;
      dispatch(updateEntity(id, entity));
    }
    return;
  };

  const defaultValues = () => (
    isNew
      ? {}
      : {
        queue: bribedEntity?.queue?.join(','),
      }
  );

  const showHelp = () => {
    Modal.info({
      title: 'How to write a problem',
      content: (
        <div>
          <p>Write the numbers 1..n on a line, in an arbitrary order and separated by commas</p>
          <p>Example: 1,3,4,2</p>
        </div>
      ),
      onOk() { },
    });
  }

  const rules: Rule[] = [{
    async validator(_, names: string) {
      if (names.length === 0)
        return Promise.reject(new Error('Queue is required'));

      const queue = names.split(',').map(v => {
        const t = +v.trim();
        return t;
      })

      const f = queue.every(v => typeof v === 'number' && v > 0);
      if (!f) {
        return Promise.reject(new Error('All elements on "queue" most be positive integer'));
      }

      const n = queue.length;
      const sorted = [...queue];
      sorted.sort((a, b) => a - b);
      const list: number[] = [];
      new Array(n).fill(null).map((v, i) => { list.push(i + 1); });

      for (let i = 0; i < n; i++) {
        if (sorted[i] !== list[i])
          return Promise.reject(new Error('Elements on "queue" must be values from 1 to n, arbitrarily ordered'));
      }
    },
  }]

  return (
    <div className="app-page bribed-edit">
      <div className="site-layout-content">
        <EntityHeader title={isNew ? "Add new problem" : "Edit problem"} loading={loading} goBack />
        {loading ? (
          <EntityLoading />
        ) : (
          <Form
            layout="vertical"
            onFinish={saveEntity}
            initialValues={defaultValues()}
          >

            <Form.Item label="Queue" required tooltip="This is a required field">
              <Space>
                <Form.Item
                  name="queue"
                  noStyle
                  rules={rules}
                >
                  <Input style={{ width: 160 }} placeholder="Please input" className="size-large" />
                </Form.Item>
                <Tooltip title="Useful information">
                  <Typography.Link onClick={showHelp} >Need Help?</Typography.Link>
                </Tooltip>
              </Space>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={updating}>
                <SaveOutlined />
                Save
              </Button>
            </Form.Item>

          </Form>
        )}
      </div>
    </div>
  );
};

export default BribedUpdate;
