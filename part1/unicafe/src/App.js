import { useState } from 'react'

const Button = ({ text, handler}) => {
  return <button onClick={handler}>{text}</button>
}

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>
  }

  return (
    <>
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine
          text="average"
          value={(good + neutral * 0 + bad * -1) / (good + neutral + bad)}
        />
        <StatisticLine
          text="postive"
          value={(good / (good + neutral + bad) * 100) + " %"}
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
      
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
    )
}

export default App;
