export default function Die({die, hold}){

    const styles={backgroundColor: die.isHeld?"#59E391":"white"}

    return (
            <button 
            onClick={()=>hold(die.id)} 
            className="btn" style={styles} 
            aria-pressed={die.isHeld}
            aria-label={`Die with value ${die.value}, 
            ${die.isHeld ? "held" : "not held"}`}>
            {die.value}
            </button>
            )
}