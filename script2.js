// NASA APOC (Astronomy Pic of Day) - GET https://api.nasa.gov/planetary/apod

// Notes from 7-12
// So far so good, but need to create a new function to just store the current date, possibly
// call back others to get you. 
// need to fix how generateDate works, make sure there is an external tally for that function
// consider revising all tallies for list, what needs to be recorded in the larger scope and 
// what doesn't.
// look into creating a randomizer. 
// look into how to implement the date input into the category

const heading = document.querySelector('#heading');
heading.innerText = 'Astronomy Picture of the Day!';
let response;
const storedDate = '&date=2023-07-13';
let newDate = '';

const firstAstroPic = async() => {
    try {
        response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=cQdEEJJw4GqFGHgquvNCdKMyHIjoUHtx5tp2N2ig`);
        const astroData = await response.json();
        const astroPic = document.querySelector('#astroPic');
        astroPic.setAttribute('src', `${astroData.hdurl}`);
        const astroTitle = document.querySelector('#astroTitle');
        astroTitle.innerText = astroData.title;
        const astroExplain = document.querySelector('#astroExplain');
        astroExplain.innerText = astroData.explanation;
    } catch (error) {
        console.log(`Something went wrong.`, error);
    }
}

firstAstroPic();

const renderAstroPic = async(addedOnAPI) => {
    try {
        response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=cQdEEJJw4GqFGHgquvNCdKMyHIjoUHtx5tp2N2ig+${addedOnAPI}`);
        const astroData = await response.json();
        const astroPic = document.querySelector('#astroPic');
        astroData.setAttribute('src', `${astroPic.hdurl}`);
        const astroTitle = document.querySelector('#astroTitle');
        astroTitle.innerText = `${astroPic.title}`;
        const astroExplain = document.querySelector('#astroExplain');
        astroExplain.innerText = astroPic.explanation;
    } catch (error){
        console.log(`Something went wrong.`, error)
    }
}

const changeDate = (dateIcrement = 0) => {
    newDate = storedDate.split('');
    let justDate = Number(newDate.splice(14,16).join(''));
    justDate += dateIncrement;
    newDate += justDate;
    newDate = newDate.join('');
    // if(storedDate === newDate){
    //     alert('Cant do that, Jim!');
    //     return;
    // }
    console.log(newDate);
}

changeDate();

const previousButton = document.querySelector('#previousButton');
const previousButtonClick = previousButton.addEventListener('click', async(event) => {
    event.preventDefault();
    previousTally--;
    const pastDate = generateDate(previousTally);
    response = await fetch (`https://api.nasa.gov/planetary/apod?api_key=cQdEEJJw4GqFGHgquvNCdKMyHIjoUHtx5tp2N2ig` + `${pastDate}`);
    renderAstroPicOfDay(response);
}); 