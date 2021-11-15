import React from "react";
import { Spin, Alert } from "antd";

export interface IEntityLoadingProps {
    className?: string;
    type?: "info" | "success" | "warning" | "error";
    message?: React.ReactNode;
}

const EntityLoading: (props: IEntityLoadingProps) => JSX.Element = ({
    type = 'info',
    className = '',
    message = 'Cargando...',
}) => {
    return (
        <div className={`entity-loading ${className}`}>
            <Spin tip="">
                <Alert type={type} message={message} />
            </Spin>
        </div>
    )
}

export default EntityLoading;