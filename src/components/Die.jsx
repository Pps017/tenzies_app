export default function Die({die, hold}){

    const styles={backgroundColor: die.isHeld?"#59E391":"white"}

    return (<button onClick={()=>hold(die.id)} className="btn" style={styles}>{die.value}</button>)
}