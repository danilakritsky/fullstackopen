import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>
        give feedback
      </h1>
      <Button text="good" handler={() => setGood(good + 1)} />
      <Button text="neutral" handler={() => setNeutral(neutral + 1)} />
      <Button text="bad" handler={() => setBad(bad + 1)} />
      <h1>
        statistics
      </h1>
      <Counter text="good" count={good} />
      <Counter text="neutral" count={neutral} />
      <Counter text="bad" count={bad} />
    </>
    )
}

const Button = ({ text, handler}) => {
  return <button onClick={handler}>{text}</button>
}

const Counter = ({ text, count }) => <div>{text} {count}</div>

export default App;
