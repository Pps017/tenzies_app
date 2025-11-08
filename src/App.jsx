import React from "react"
import Die from "./components/Die.jsx"
import {nanoid} from "nanoid"

export default function App(){

    const [dice, setDice]=React.useState(generateAllNewDice())

    function generateAllNewDice(){
        let arr=[]
        for(let i=0; i<10; i++){
            arr.push(({value: Math.floor(Math.random()*6+1), isHeld:true, id:nanoid()}))
        }
        return arr
    }

    function rollDice(){
        setDice(oldDice=>oldDice.map(die=>(!die.isHeld?{...die,value:Math.floor(Math.random()*6+1)}:{...die})))
    }

    function hold(id){
        setDice(oldDice=>oldDice.map(die=>(die.id===id?{...die,isHeld:!die.isHeld}:{...die})))
    }

    const diceElements=dice.map(die=><Die key={die.id} die={die} hold={hold} />)

    return (<main className="main">
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="dice-container">
                    {diceElements}
                </div>
                <button onClick={rollDice} className="roll-btn">Roll</button>
            </main>)
}