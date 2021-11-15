import './EntityButtons.scss';
import React from "react";
import { Button } from "antd";
import { SaveOutlined, EditOutlined } from '@ant-design/icons';
import { Form } from 'antd';

export interface IEntityButtonsProps {
	updating?: boolean;
}

const EntityButtons: (props: IEntityButtonsProps) => JSX.Element = ({ updating }) => {
	return (
		<Form.Item className="entity-buttons">
			<div className="entity-buttons-content">
				<Button type="primary" htmlType="submit" loading={updating} >
					<SaveOutlined />
					Save
				</Button>
			</div>
		</Form.Item>
	)
}

export default EntityButtons;