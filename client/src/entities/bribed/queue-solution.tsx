import React from 'react';
import { Tag } from 'antd';
import './queue-solution.scss'
import { LeftOutlined } from '@ant-design/icons';

export interface IQueueSolutionProps {
    queue?: number[];
    indexA?: number;
    indexB?: number;
}

const QueueSolution: (props: IQueueSolutionProps) => JSX.Element = ({ queue, indexA, indexB }) => {
    return (
        <div className="queue-solution">
            <ol className="queue-solution__list">
                {queue?.map((v, index) => (
                    <li key={v} className="queue-solution__list--item">
                        <Tag
                            color={(indexA === index || indexB === index) ? "red" : "blue"}
                            className={`tag-circle ${indexB === index ? 'tag-arrow' : ''}`}
                        >
                            {v}
                        </Tag>
                        <div className={`item-link ${indexB === index ? 'link-arrow' : ''}`} >
                            {indexB === index && <LeftOutlined className="icon-arrow" />}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default QueueSolution;