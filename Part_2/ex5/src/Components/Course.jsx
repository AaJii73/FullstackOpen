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


  export {Course, Header}