import React, { createContext, useReducer } from 'react'
import { Button } from 'antd';
import TodoInput from './Todo/Input';
import TodoList from './Todo/List';
import styles from './style.module.css';

const initialState = {
  past: [],
  present: [{ id: 1, context: { firstName: 'test', sencondName: 'test', forget: true } }],
  future: []
}

const reducer = (state, action) => {
  if (action.type === 'ADD') {
    return {
      past: [state.present, ...state.past],
      present: [
        action.payload,
        ...state.present
      ],
      future: []
    }
  }

  if (action.type === 'FORGET') {
    const newPresent = state.present.map(c => {
      if (c.id === action.payload.id) {
        return {
          ...c, forget: !c.forget
        }
      }
      return c
    })
    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: []
    }
  }

  if (action.type === 'UNDO') {
    const [newPresent, ...newPast] = state.past
    return {
      past: newPast,
      present: newPresent,
      future: [state.present, ...state.future]
    }
  }

  if (action.type === 'REDO') {
    const [newPresent, ...newFuture] = state.future
    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: newFuture
    }
  }

  return state
}

export const ReducerContext = createContext(initialState)

const UNDO = () => {
  const [state, dispath] = useReducer(reducer, initialState)

  const undo = () => {
    dispath({ type: 'UNDO' })
  }

  return (
    <div className={ styles.UNDO }>
      <ReducerContext.Provider value={ { ...state, dispath } }>
        <TodoInput />
        <div className={ styles.opt }>
          <Button type="primary" danger style={ { marginRight: '20px' } } disabled={ !state.past.length }
            onClick={ undo }
          >
            UNDO
          </Button>
          <Button type="primary" danger>
            REDO
          </Button>
        </div>
        <TodoList />
      </ReducerContext.Provider>
    </div>
  )
}
export default UNDO;
