import React from 'react'
const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
const sum = course.parts.reduce((sum,part) => sum+part.exercises, 0)
return(
    <p>Number of exercises {sum}</p>
) 
}
  
const Part = (props) => {
return (
    <p>
    {props.part.name} {props.part.exercises}
    </p>    
)
}
const Course = ({course}) => {
return (
    <div>
    <Header course={course}/>
    <Content parts = {course.parts}/>
    <Total course = {course}/>
    </div>

)
}
  
  
  
const Content = ({ parts }) => {
return (
    <div>
    {parts.map(part =>
        <Part key={part.id} part={part}/>  
    )}
    </div>
)
}

export default Course