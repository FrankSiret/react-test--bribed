import './EntityHeader.scss';
import React from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export interface IEntityHeaderProps {
  title: string;
}

const EntityHeader: (props: IEntityHeaderProps) => JSX.Element = ({ title }) => {
  const history = useHistory();

  return (
    <div className="entity-header">
      <h2 className="title">
        {title}
      </h2>
      <Button onClick={() => history.goBack()} className="round-icon ant-circle-btn go-back" title="Go back">
        <ArrowLeftOutlined />
      </Button>
    </div>
  );
};

export default EntityHeader;
