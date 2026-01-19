const Header = ({ name }) => {
  console.log(name)
  return <h1>{name}</h1>
}

const Part = ({ part }) => {
  console.log(part)
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ parts }) => {
  console.log(parts)
  return (
    <div>
      {parts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    console.log(s, p)
    return s + p.exercises
  }, 0)
  return (
    <b>total of exercises {total}</b>
  )
}

const Course = ({ course }) => {
  return (
    <div><Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course