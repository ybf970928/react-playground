import React, { useContext } from 'react'
import { Card, Checkbox } from 'antd';
import { ReducerContext } from '../../index'

const TodoList = () => {
    const { present, dispath } = useContext(ReducerContext)

    const onChange = (id) => {
        dispath({
            type: 'FORGET', payload: {
                id: id
            }
        })
    }

    return (
        present.map(item => {
            return (
                <Card key={ item.id } style={ { marginBottom: 10 } }>
                    <p>{ item.context.firstName }</p>
                    <p>{ item.context.sencondName }</p>
                    <Checkbox onChange={ () => onChange(item.id) } checked={ item.forget }>forget</Checkbox>
                </Card>
            )
        })
    )
}
export default TodoList