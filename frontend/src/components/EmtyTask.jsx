import React from 'react'
import {Card} from "./ui/card";
import { Circle } from 'lucide-react';

const EmtyTask = ({filter}) => {
  return (
    <Card className='min-h-80 flex items-center justify-center'>
        <Circle/>
        {
            filter === 'all' ? (
                <p>Chưa có công việc nào</p>
            ) : filter === 'pending' ? (
                <p>Chưa có công việc nào đang làm</p>
            ) : (
                <p>Chưa có công việc nào hoàn thành</p>
            )
        }
    </Card>
  )
}

export default EmtyTask