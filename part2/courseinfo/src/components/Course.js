const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((rollingTotal, element) => rollingTotal + element)
  return <p><strong>total of  {total} exercises</strong></p>
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </>
  )
}

 const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </>
  )
 }

export default Course