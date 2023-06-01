import React, { useEffect, useState } from 'react';
import './CricketCounter.css';

function CricketCounter() {
    
    const totalballs = 6;
    const totalOvers = 5;

    const [totalRuns, setTotalRuns] = useState(0);

    const [currentOverCount, setCurrentOverCount] = useState(0)
    const [currentBallCount , setCurrentBallCount] = useState(0);
    const [currentOverList, setCurrentOverList] = useState([]);

    const [scorecard, setScoreCard] = useState([])
    const [isScoreCardDisplay, setScoreCardDisplay] = useState(false)


    useEffect(()=> {
        if(currentOverList.length === 6)
        {
            setScoreCard((prevScoreCard) => [...prevScoreCard, currentOverList])
            setCurrentOverList([]);
        }
    }, [currentOverList])

    function UpdateStatus(event) 
    {
        const userInput = event.target.value;
        let userChoice  = userInput[0];
        setCurrentOverList((prevOverList) => [...prevOverList, userChoice]);
        
        switch(userInput)
        {
            case 'Wicket':
                setCurrentBallCount((prevBallCount)=> {
                    if(prevBallCount+1 === totalballs)
                    {
                        // setScoreCard((prevScoreCard) => [...prevScoreCard, currentOverList]);
                        // setCurrentOverList([]);
                        setCurrentOverCount(currentOverCount + 1);
                        return 0;
                    }

                    return prevBallCount+1;

                })
                break;
            case 'wide':
                setTotalRuns(totalRuns + 1);
                break;
            case 'Nb':
                setTotalRuns(totalRuns + 1);
                break;
            
            default:
                setTotalRuns(totalRuns + parseInt(userInput));
                // console.log(currentOverList)

                setCurrentBallCount((prevBallCount)=> {
                    if(prevBallCount+1 === totalballs)
                    {
                        setCurrentOverCount(currentOverCount + 1);
                        return 0;
                    }
                  
                    return prevBallCount+1;

                });
                break;


        }
        
    }

    function changeScoreCardDisplayState()
    {
        console.log(scorecard)
        setScoreCardDisplay((prevState) => {
            return !prevState
        })
    }

    

  return (
    <React.Fragment>
        <h1>Cricket Counter</h1>
        <p>Total Runs: {totalRuns}</p>
        { currentOverCount === totalOvers ? <span>Match Over</span> :  
        <div className='over-div'>
        <p>Current Over : {currentOverCount} / {totalOvers}</p>
        <p>Current Over List: {currentOverList.map((over, index) => <span key={index} className='overChart'>{over}</span>)}</p>
        <p>Current Ball Count: {currentBallCount}/ {totalballs}</p>

        <div className='btn'>
            <button onClick={ (event) => {
                UpdateStatus(event);
            }} value='0'>0</button>
            <button onClick={(event) => {
                UpdateStatus(event);
            }} value='1'>1</button>
            <button onClick={ (event) => {
                UpdateStatus(event);
            }} value='2'>2</button>
            <button onClick={ (event) => {
                UpdateStatus(event);
            }} value='3'>3</button>
            <button onClick={ (event) => {
                UpdateStatus(event);
            }} value='4'>4</button>
            <button onClick={  (event) => {
                UpdateStatus(event);
            }} value='5'>5</button>
            <button onClick={  (event) => {
                UpdateStatus(event);
            }} value='6'>6</button>
            <button onClick={ (event) => {
                UpdateStatus(event);
            }} value='Wicket'>Wicket</button>
            <button onClick={ (event) => {
                UpdateStatus(event);
            }} value='wide'>Wide</button>
            <button onClick={ (event) => {
                UpdateStatus(event);
            }} value='Nb'>No Ball</button>
        </div>
        </div> }
       
        <div className='score-card'>
        <button onClick={changeScoreCardDisplayState}> {isScoreCardDisplay ? 'Hide ScoreCard' : 'Show ScoreCard'} </button>
        {isScoreCardDisplay ? <div className='scorecard-content'>
            <ul>
                {scorecard.map((element,index) => {
                    return <li key={index}>Over: {index+1} - <span className='scorecard-letters'>{element}</span> </li>
                })}
            </ul>

        </div> : null}
        
        </div>


        


    </React.Fragment>
  )
}

export default CricketCounter
