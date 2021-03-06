import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))
  const [best, setBest] = useState()
  

  const randomAnecdote = () => {
      let random = Math.floor(Math.random() * 6);
      setSelected(random);
  }

  const clickVote = () => {
      const copy = [...votes]
      copy[selected] += 1
      setVotes(copy)
      setBest(bestAnecdote)
  }

  const bestAnecdote = () => {
    let highest = 0
    let index = 0;
    for(let i = 0; i<votes.length; i++){
        if(votes[i] >= highest){
            highest = votes[i]
            index = i;
        }
    }
    return index
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={clickVote}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[best]}</p> 
      <p>has {votes[best]} votes</p> 
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
