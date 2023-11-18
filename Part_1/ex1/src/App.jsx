const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Header = (props) => {
    return (
       <h1> {props.course} </h1>
    )
  }

  const Content = (props) => {
    return (
      <>
        <p>
          {props.part1[0]} {props.part1[1]}
        </p>
        <p>
          {props.part2[0]} {props.part2[1]}
        </p>
        <p>
          {props.part3[0]} {props.part3[1]}
        </p>
      </>
    )
    }

  const Total = (props) => {
    return (
      <p>Number of exercises {props.exercises.reduce((total,i) =>  total = total + i , 0 )}</p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={[part1, exercises1]} part2={[part2, exercises2]} part3={[part3, exercises3]} />
      <Total exercises={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App