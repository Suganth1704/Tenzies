import './App.css';
import Die from './Component/Die';
import { useState ,useEffect} from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'



function App() {
  //Function to generate array 10 random numbers
  function allNewDice(){
    let arr=[]
    for(let i=0;i<10;i++){
      arr.push(
        {
          value: Math.floor(Math.random()*6+1),
          isHeld:false,
          id:nanoid()
        }
        )
    }
    return arr
  }
  // console.log(allNewDice())

  //State to get the array of random numbers
  const[dice,setDice]=useState(allNewDice())

  //new State to check the win
  const [tenzies,setTenzies] = useState(false)
  

  useEffect(()=>{
    const allHeld=dice.every(die => die.isHeld)
    const firstVal=dice[0].value
    const allSameValue=dice.every(die =>die.value === firstVal)
    if(allHeld && allSameValue)
    {
      setTenzies(true)
      console.log("you win")
    }
  
  },[dice])


  
  
  //Function to roll the dice using setDice => Chaning State
  function roll(){
    setDice(prevState => prevState.map(die => {
      return die.isHeld ? die : 
      {
       
        value: Math.floor(Math.random()*6+1),
        isHeld:false,
        id:nanoid()
      }
    }))
  }

  //Funaction to reset the Game
  function resetGame(){
    setTenzies(false)
    setDice(allNewDice())
  }

  //To hold the state of the sellected dice
  function toggle(id){
    setDice(prevState => prevState.map(die => {
      return die.id === id ? {...die, isHeld :!die.isHeld} : die
    }))
  }
  
  //Mapping array of random numbers to the die component
  const dieElement=dice.map((die)=> <Die key={die.id} value={die.value} isHeld={die.isHeld} id={die.id} toggle={toggle} />)
  return (
    
    
      <main>
         {tenzies && <Confetti/>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {dieElement}
        </div>
        {tenzies ? <button onClick={resetGame} className="roll-button">New Game</button> : <button onClick={roll} className="roll-button">Roll</button>}
      </main>
    
    
  )
}

export default App;
