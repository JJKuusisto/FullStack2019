import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () =>(
    <h1>give feedback</h1>
)

const Button = ({handleClick, text}) =>(
    <button onClick={handleClick}>{text}</button>
)

const Statistics = (props) => {
    if(props.good !== 0 || props.neutral !== 0 || props.bad !== 0){
    return(
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                <Statistic text="Good" stat={props.good} />
                <Statistic text="Neutral" stat={props.neutral} />
                <Statistic text="Bad" stat={props.bad} />
                <Statistic text="All" stat={props.total} />
                <Statistic text="Average" stat={props.average} />
                <Statistic text="Positives" stat={props.positives} unit="%"/>
                </tbody>
            </table>
   
        </div>
    )} else {
        return(
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )   
    }
}

const Statistic = ({text, stat, unit}) => {
    return(
        <tr>
            <td>{text}</td>
            <td>{stat}</td>
            <td>{unit}</td>
        </tr>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  const total = (good, neutral, bad) => good + bad + neutral
  const average = (good, neutral, bad) => {
      let g = good
      let n = 0
      let b = bad * -1
      return (g + n + b)/total(good, neutral, bad)
  }
  const positives = (good, neutral, bad) => good / total(good, neutral, bad) * 100


  return (
    <div>
      <Header />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total(good, neutral, bad)}
      average={average(good, neutral, bad)} positives={positives(good, neutral, bad)}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
