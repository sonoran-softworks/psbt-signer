import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [accounts, setAccounts] = useState([])
  const [psbtString, setPsbtString] = useState('')
  const [signedPsbt, setSignedPsbt] = useState('')
  useEffect(() => {
    async function getAccount() {
      if (window.unisat) {
        const accounts = await window.unisat.getAccounts()
        setAccounts(accounts)
        console.log(accounts)
      }
    }
    getAccount()
  }, []);

  async function handleSubmit() {
    if (window.unisat) {
      const psbt = await window.unisat.signPsbt(psbtString)
      console.log(psbt)
      setSignedPsbt(psbt)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ 
          margin: '20px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px'  // Adds consistent spacing between elements
        }}>
          <input
            type="text"
            value={psbtString}
            onChange={(e) => setPsbtString(e.target.value)}
            placeholder="Enter PSBT string"
            style={{
              padding: '10px',
              width: '300px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',  // This is already set to pointer, which shows as a finger
              border: 'none',
              borderRadius: '4px',
              color: 'blue',
              width: '200px'
            }}
          >
            Sign PSBT
          </button>
          <textarea
            value={signedPsbt}
            readOnly
            placeholder="Signed PSBT will appear here"
            style={{
              padding: '10px',
              width: '300px',
              height: '100px',
              fontSize: '14px',
              resize: 'vertical',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
