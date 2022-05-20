import { useState } from 'react'

const Button = ({ text, handler}) => {
  return <button onClick={handler}>{text}</button>
}

const Counter = ({ text, count }) => <div>{text} {count}</div>

const Statistics = ({ good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <div>
        <Counter text="good" count={good} />
        <Counter text="neutral" count={neutral} />
        <Counter text="bad" count={bad} />
        <Counter text="all" count={good + neutral + bad} />
        <Counter
          text="average"
          count={(good + neutral * 0 + bad * -1) / (good + neutral + bad)}
        />
        <Counter
          text="postive"
          count={(good / (good + neutral + bad) * 100) + " %"}
        />
      </div>
    </>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
    )
}

export default App;
