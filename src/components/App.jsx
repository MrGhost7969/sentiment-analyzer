import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios'

function App() {

  const [text, setText] = useState('');

  const textBox = useRef();
  let empty = '...';

  // Fetch backend
  async function getML() {
    await axios.get('/api')
      .then(response => response.ok && response.body)
      .catch(err => console.log("Error fetching: " + err));
  }

  // Send input to backend
  async function handleClick(e) {
    e.preventDefault();
    await axios.post('/api', {
      text
    })
      .then(response => {
        console.log(JSON.stringify(response))
        console.log(setText(response.data))
      })
      .catch(err => console.log("Something's not right: " + err));
  }

  useEffect(() => {
    getML();
  }, []);

  return (
    <>
      <h1><strong>Emoji Generator</strong></h1>
      <div className='flex justify-center content-center m-60'>
        <form>
          <div className='m-5' name='textfield'>
            {text !== '' ?
              (<p>{text}</p>) :
              (<h1><span>Insert text below!</span></h1>)
            }
          </div>
          <TextField
            ref={textBox} id="outlined-basic"
            label="Insert Text" variant="outlined"
            onChange={e => { setText(e.target.value); e.preventDefault(); }}
          />
          <div className='mt-5'>
            <Button variant="contained" onClick={handleClick} type='submit'>Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default App;