import React from "react"
import Die from "./components/Die.jsx"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){

    const [dice, setDice]=React.useState(() => generateAllNewDice())

    const buttonRef = React.useRef(null)

    const gameWon=dice.every(die => die.isHeld) &&  dice.every(die => die.value === dice[0].value)

    function generateAllNewDice(){
        let arr=[]
        for(let i=0; i<10; i++){
            arr.push(({value: Math.floor(Math.random()*6+1), isHeld:false, id:nanoid()}))
        }
        return arr
    }

    function rollDice(){
        setDice(oldDice=>oldDice.map(die=>(!die.isHeld?{...die,value:Math.floor(Math.random()*6+1)}:{...die})))
    }

    function hold(id){
        setDice(oldDice=>oldDice.map(die=>(die.id===id?{...die,isHeld:!die.isHeld}:{...die})))
    }

    function handleClick(event){
        return !gameWon ? rollDice() : setDice(generateAllNewDice())
    }

    React.useEffect(()=>{
        gameWon?buttonRef.current.focus():null
    },[gameWon])

    const diceElements=dice.map(die=><Die key={die.id} die={die} hold={hold} />)

    return (<main className="main">
                {gameWon && <Confetti />}
                <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
                </div>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="dice-container">
                    {diceElements}
                </div>
                <button ref={buttonRef} onClick={handleClick} className="roll-btn">{gameWon?"New Game":"Roll"}</button>
            </main>)
}