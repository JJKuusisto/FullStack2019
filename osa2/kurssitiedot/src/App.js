import React from 'react';
import Course from './components/Course'




const App = ({courses}) =>{

    return (
        <div>
            {courses.map(c => <Course key={c.id} course={c} />)}
        </div>
      )
}

export default App