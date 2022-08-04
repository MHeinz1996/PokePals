import {useState} from 'react'

function Play_w_Pokemon() {
  const [hidden, setHidden] = useState(true)

  const NumberGame = () => {
    if(hidden) {
      const getNum = () => {
        return Math.ceil(Math.random() * 9)
      }
      let num1 = getNum()
      let num2 = getNum()
      if(num2 === num1) {
        if(num2 < 9) {
          num2++
        } else {
          num2--
        }
      }
      document.getElementById('first-num').innerHTML = `${num1}`
      document.getElementById('second-num').innerHTML = `${num2}`
      setHidden(!hidden)
    } else {
      document.getElementById('first-num').innerHTML = ''
      document.getElementById('second-num').innerHTML = ''
      setHidden(!hidden)
    }
  }

  return (
    <div>
      <button onClick={() => NumberGame()}>Play</button>
    </div>
  )

}

export default Play_w_Pokemon