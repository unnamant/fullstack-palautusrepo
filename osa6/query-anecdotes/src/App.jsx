import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotification(`you voted '${updatedAnecdote.content}'`, 10)
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }
 
  console.log(JSON.parse(JSON.stringify(result)))
 
  if (result.isLoading) {
    return <div>loading data...</div>
  }
 
  const anecdotes = [...result.data].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default App
