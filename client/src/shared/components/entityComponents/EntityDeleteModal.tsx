import React from "react";
import { Modal, Button, Spin } from "antd";
import { StopOutlined, DeleteOutlined } from '@ant-design/icons';

export interface IEntityDeleteModalProps {
    title: string;
    confirmDelete: () => void;
    handleClose: () => void;
    loading?: boolean;
    updating?: boolean;
    visible?: boolean;
    children: React.ReactNode;
}

const EntityDeleteModal: (props: IEntityDeleteModalProps) => JSX.Element = ({
    title,
    confirmDelete,
    handleClose,
    loading = false,
    updating = false,
    visible = true,
    children
}) => {
    return (
        <Modal
            visible={visible}
            title={title}
            onOk={confirmDelete}
            onCancel={handleClose}
            footer={[
                <Button
                    key="back"
                    size="small"
                    className="secondary"
                    onClick={handleClose}
                >
                    <StopOutlined />
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    size="small"
                    className="danger"
                    type="primary"
                    onClick={confirmDelete}
                    loading={loading || updating}
                >
                    <DeleteOutlined />
                    Delete
                </Button>
            ]}
        >
            {loading ? (
                <Spin />
            ) : (
                children
            )}
        </Modal>
    )
}

export default EntityDeleteModal;