import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'
  
const AnecdoteList = () => {
  const dispatch = useDispatch()

  const allAnecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

    const anecdotes = allAnecdotes
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes)

  const vote = async (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(setNotificationMessage(`You voted '${anecdote.content}'`, 10))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default AnecdoteList
