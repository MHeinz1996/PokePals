import {useState} from 'react'
import MyVerticallyCenteredModal from './Modal'

function Status({species, hunger, happiness}) {
  const [modal, setModal] = useState(false)

  return (
    <div>
      <button onClick={() => setModal(true)}>Status</button>
      <MyVerticallyCenteredModal pokemon={species} happiness={happiness} hunger={hunger} show={modal} onHide={() => setModal(false)} /> 
    </div>
  )
}

export default Status