const Course = ({course}) => {
  return (
    <div>
    <SubHeader headerText={course.name} />
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

const SubHeader = ({headerText}) => {
  return (
    <h2>
    {headerText}
    </h2>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />) }
      <Total parts={parts} />
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

const Total = ({parts}) => {
  return (
    <b>
      total of { parts.reduce((s, p) => p.exercises + s, 0 ) } exercises
    </b>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
  <div> 
    <Header headerText={"Web development curriculum"} />
  {courses.map(course => <Course key={course.id} course={course} />) } 
  </div>
  )

}

export default App