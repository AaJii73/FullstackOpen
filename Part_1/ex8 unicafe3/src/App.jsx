import { useState } from 'react'

const Header = ({text}) => (
  <h1>
    {text}
  </h1>
)

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
      {text}
  </button>
)



const Statistic = ({text}) => (
  <div>
    {text}
  </div>
)

const Statistics = (props) => {
  const {good, bad, neutral} = props
  return (
  <div>
    <Statistic text = {"good " + good}/>
    <Statistic text = {"neutral " + neutral}/>
    <Statistic text = {"bad " + bad}/>
    <Statistic text = {"all " + (good + bad + neutral)}/>
    <Statistic text = {"average " + (good - bad) / (good + bad + neutral)}/>
    <Statistic text = {"positive " + (100 * good / (good + bad + neutral)) + " %"}/>
  </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <Header text={"give feedback"}></Header>
        <Button onClick={() => setGood(good + 1)} text={"good"} />
        <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
        <Button onClick={() => setBad(bad + 1)} text={"bad"} />
      <Header text={"statistics"}></Header>
        <Statistics good = {good} bad = {bad} neutral = {neutral}  />

    </div>
  )
}

export default App