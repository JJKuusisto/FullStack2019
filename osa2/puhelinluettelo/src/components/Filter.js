import React from 'react'

const Filter = ({filter}) => {
    return (
        <form>
          <div>
              filter shown with<input onChange={filter}/>
          </div>
      </form>
    )
}
export default Filter