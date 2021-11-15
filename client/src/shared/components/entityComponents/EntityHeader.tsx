import './EntityHeader.scss';
import React from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined, SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { NavLink, useHistory } from 'react-router-dom';

export interface IEntityHeaderProps {
  title: string;
  goBack?: boolean;
  update?: () => void;
  loading?: boolean;
  addRoute?: string;
}

const EntityHeader: (props: IEntityHeaderProps) => JSX.Element = ({ title, goBack, update, loading, addRoute }) => {
  const history = useHistory();

  return (
    <div className="app-entity-header">
      <div className="entity-header">
        <h2 className="title">
          {title}
        </h2>

        {goBack &&
          <Button onClick={() => history.goBack()} shape="circle" className="go-back" title="Go back" >
            <ArrowLeftOutlined />
          </Button>}
        {update &&
          <Button onClick={() => update()} shape="circle" className="refresh-entity" title="Refresh">
            <SyncOutlined spin={loading} />
          </Button>}
      </div>
      {addRoute &&
        <NavLink to={addRoute}>
          <Button className="add-entity" type="primary" shape="circle">
            <PlusOutlined />
          </Button>{' '}
          Add new problem
        </NavLink>
      }
    </div >
  );
};

export default EntityHeader;
