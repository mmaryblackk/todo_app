import React, { useEffect } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { init } from './features/todosSlice';
import { filterTodos } from './helpers/filterBy';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const App: React.FC = () => {
  const { todos, status } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const filteredTodos = filterTodos(todos, status);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm />
        <section className="todoapp__main" data-cy="TodoList">
          <TransitionGroup>
            {filteredTodos.map(todo => (
              <CSSTransition key={todo.id} timeout={300} classNames="item">
                <TodoItem key={todo.id} todo={todo} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </section>
        {todos.length > 0 && <TodoFilter />}
      </div>
    </div>
  );
};
