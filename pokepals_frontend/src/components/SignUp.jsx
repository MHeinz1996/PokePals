import axios from 'axios'

function SignUp({account, setAccount}) {
  
  const handleSubmit = (event) => {
    event.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    
    axios.post('/signup', {email: email, password: password}).then((response) => {
      if(response.data.success === true) {
        handleClick()
      }
    })
  }
  
  const handleClick = () => {
    setAccount(!account)
  }

  return(
    <div className="SignUp">
      <h3 className='login-signup'>Sign Up</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <input type="email" id="email" placeholder='email' required/>
        <br />
        <br />
        <input type="password" id="password" placeholder='password' required/>
        <br />
        <br />
        <button type="submit">Submit</button>
        <span> </span>
        <button onClick={handleClick}>Log In</button>
      </form>
    </div>
  )
}

export default SignUp