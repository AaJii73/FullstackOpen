const Course = ({course}) => {
  return (
    <div>
    <Header headerText={course.name} />
    <Content parts={course.parts}/>
    </div>
  )
}

const Header = ({headerText}) => {
  return (
    <h1>
    {headerText}
    </h1>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />) }
    </div>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const App = () => {
    const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App