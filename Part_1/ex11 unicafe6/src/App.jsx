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



const StatisticLine = ({text, value}) => (
  <tr>
    <td> {text} </td> <td> {value} </td> 
  </tr>
)

const Statistics = (props) => {
  const {good, bad, neutral} = props
  if ((good + bad + neutral == 0))
  {
    return <div>No feedback given</div>
  }
  return (
  <div>
    <StatisticLine text = {"good"} value ={good}/>
    <StatisticLine text = {"neutral"} value ={neutral}/>
    <StatisticLine text = {"bad"} value ={bad}/>
    <StatisticLine text = {"all"} value ={good + bad + neutral}/>
    <StatisticLine text = {"average"} value ={(good - bad) / (good + bad + neutral)}/>
    <StatisticLine text = {"positive"} value ={(100 * good / (good + bad + neutral)) + " %"}/>
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