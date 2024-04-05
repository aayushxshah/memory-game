/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// API docs: https://akabab.github.io/superhero-api/
import { useEffect, useState } from 'react'
import '../styles/App.css'
import Card from './Card'
import Footer from './Footer';

function App() {

    const [imagesClicked, setImagesClicked] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [cardDeck, setCardDeck] = useState();
    const INVALID_INDEXES = [9, 16, 19, 21, 22];
    
    useEffect(() => generateDeck(), []);

    function generateCardNum() {
        return Math.floor(Math.random() * 25) + 1;
    }

    function generateDeck() {
        let deck = [];
        let indexes = []
        for (let i = 0; i < 12; i++){
            let index;
            do {
                index = generateCardNum();
            } while (INVALID_INDEXES.includes(index) || indexes.includes(index));
            indexes.push(index);
            deck.push(<Card index={index} onClickHandler={handleCardClick}/>);
        }
        
        setCardDeck(
            <div id='deck'>
                {deck}
            </div>
        );
    }

    function handleCardClick(index) {
        
        setImagesClicked(prevImagesClicked => {
            console.log(`imagesClicked: ${prevImagesClicked}\nindex: ${index}`);
            if (prevImagesClicked.includes(index)){
                setCurrentScore(0);
                return [];
            } else {
                setCurrentScore(prev => prev + 1);
                // setCurrentScore(prevScore => {
                //     console.log(`prevScore: ${prevScore}`);
                //     return prevScore + 1;
                // });
                return [...prevImagesClicked, index];
            }
        });
        generateDeck();
    }

    useEffect(() => {
            setBestScore(() => Math.max(currentScore, bestScore));
        },
        [currentScore]
    );

    return (
        <>
            <h2>Best Score: {bestScore}</h2>
            <h2>Current Score: {currentScore}</h2>
            {cardDeck}
            <Footer />
        </>
    )
}

export default App