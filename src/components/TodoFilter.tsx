import classNames from 'classnames';
import {
  removeCompleted,
  selectUncompletedCount,
  setFilter,
} from '../features/todosSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { FilterOption } from '../types/FilterOption';

export const TodoFilter = () => {
  const { todos, status } = useAppSelector(state => state.todos);
  const todosLeft = useAppSelector(selectUncompletedCount);
  const dispatch = useAppDispatch();

  const areCompletedTodos = todos.some(todo => todo.completed);

  const todosText =
    todosLeft === 0
      ? 'All is done :)'
      : todosLeft === 1
        ? '1 item left'
        : `${todosLeft} items left`;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosText}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterOption).map(option => (
          <a
            key={option}
            href={`#/${option === FilterOption.ALL ? '' : option.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: status === option,
            })}
            data-cy={`FilterLink${option}`}
            onClick={() => dispatch(setFilter(option))}
          >
            {option}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch(removeCompleted())}
        disabled={!areCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
