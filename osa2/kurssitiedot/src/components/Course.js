import React from 'react'

const Header = ({course}) =>{
    return(
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}

const Part = ({part, exercises}) =>{
    return(
        <div>
            <p>{part} {exercises}</p>
        </div>
    )
}

const Content = ({course}) =>{
    const parts = course.parts.map(c => 
        <Part key={c.id} part={c.name} exercises={c.exercises} />
        )
    return(
        <div>
            {parts}
        </div>
    )
}

const Total = ({course}) =>{
    const total = course.parts.reduce( (s, p) => {
        return s + p.exercises
      },0)
    return(
        <div>
            <h3>total of {total} exercises</h3>
        </div>
    )
}


const Course = ({course}) => {
    
    return(
        <div>
        <Header  course={course} />
        <Content course={course} />
        <Total  course={course} />
        </div>
   
    )
}

export default Course