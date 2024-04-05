/* eslint-disable react/prop-types */
// CHANGES
import { useState, useEffect } from 'react'
import '../styles/Card.css'

async function getInfo(index) {
    const response = await fetch(`https://akabab.github.io/superhero-api/api/id/${index}.json`);
    let imgID = await response.json();
    const heroName = imgID.name;
    imgID = imgID.slug;

    const imgURL = `https://akabab.github.io/superhero-api/api/images/sm/${imgID}.jpg`;

    return [imgURL, heroName];
}

export default function Card ({index, onClickHandler}) {
    const [imgURL, setImgURL] = useState(null);
    const [superheroName, setSuperheroName] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const [url, heroName] = await getInfo(index);
            setImgURL(url);
            setSuperheroName(heroName)
        }
        fetchData();
    }, [index]);

    if (!imgURL || !superheroName) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='card' id={index} key={index} onClick={() => {onClickHandler(index)}}>
                <div className='cardImg'>
                    <img src={imgURL} alt={`Superhero ${index}`} />
                </div>
                <div className='cardName'>
                    <h3>{superheroName}</h3>
                </div>
            </div>
        </>
    )
}