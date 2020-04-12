import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  /**
   * useState is a Hook that lets you add React state to function components.
   * The setState function is used to update the state. It accepts a new state
   * value and enqueues a re-render of the component.
   * https://reactjs.org/docs/hooks-reference.html#usestate
   */
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  /**
   * useCallback will return a memoized version of the callback that only
   * changes if one of the dependencies has changed. This is useful when passing
   * callbacks to optimized child components that rely on reference equality to
   * prevent unnecessary renders.
   * https://reactjs.org/docs/hooks-reference.html#usecallback
   */
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  /**
   * useEffect runs after every completed render.
   * If you want to run an effect and clean it up only once (on mount and
   * unmount), you can pass an empty array ([]) as a second argument. While
   * passing [] as the second argument is closer to the familiar componentDidMount
   * and componentWillUnmount mental model.
   * https://reactjs.org/docs/hooks-reference.html#useeffect
   */
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  /**
   * useEffect runs after every completed render.
   * While passing [prop.state] as the second argument is closer to the familiar
   * componentDidUpdate mental model.
   * https://reactjs.org/docs/hooks-reference.html#useeffect
   */
  useEffect(() => {
    // Update the tech item
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  /**
   * useMemo will only recompute the memoized value when one of the dependencies
   * has changed. This optimization helps to avoid expensive calculations on
   * every render.
   * https://reactjs.org/docs/hooks-reference.html#usememo
   */
  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br />
      <input
        type="text"
        value={newTech}
        onChange={(e) => setNewTech(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
