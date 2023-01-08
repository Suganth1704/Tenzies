
function Die(props){

    const changeColor={
        backgroundColor:props.isHeld ? "#59E391" : "white"
    }

    return(
        <div className="dice" style={changeColor} onClick={()=> props.toggle(props.id)} >
            <h4 className="value">{props.value}</h4>
        </div>
    )

}

export default Die