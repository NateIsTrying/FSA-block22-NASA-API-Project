// Call an API 
// NASA APOC (Astronomy Pic of Day) - GET https://api.nasa.gov/planetary/apod
// NASA Earth API - https://api.nasa.gov/planetary/earth/imagery
    
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
    const tomorrowsDate = '&date=2023-07-14'

// create async function
const firstAstroPicOfDay = async() => {
    //need to add try and catch here
    try {
        response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=cQdEEJJw4GqFGHgquvNCdKMyHIjoUHtx5tp2N2ig`);
        const astronomyPic = await response.json();
        // console.log(astronomyPic);
        const spaceImage = document.querySelector('#spaceImage');
        spaceImage.setAttribute('src', `${astronomyPic.hdurl}`);
        const picTitle = document.querySelector('#picTitle');
        picTitle.innerText = `${astronomyPic.title}`;
        const picExplanation = document.querySelector('#picExplanation');
        picExplanation.innerText = astronomyPic.explanation;
    } catch (error){
        console.log(`Something went wrong.`, error)
    }

}

firstAstroPicOfDay();

const renderAstroPicOfDay = async(response) => {
    try {
        const astronomyPic = await response.json();
        // console.log(astronomyPic);
        const spaceImage = document.querySelector('#spaceImage');
        spaceImage.setAttribute('src', `${astronomyPic.hdurl}`);
        const picTitle = document.querySelector('#picTitle');
        picTitle.innerText = `${astronomyPic.title}`;
        const picExplanation = document.querySelector('#picExplanation');
        picExplanation.innerText = astronomyPic.explanation;
    } catch (error){
        console.log(`Something went wrong.`, error)
    }
}

const generateDate = (dateChange = 0, monthChange = 0, yearChange = 0) => {
    const today = new Date()

    const todaysDate = today.getDate();
    let addedOnDate = todaysDate;
    addedOnDate += dateChange;

    if(addedOnDate === 0){
        monthChange -= 1
        addedOnDate = 30;
    }

    const todaysMonth = today.getMonth();
    let addedOnMonth = todaysMonth + 1;
    addedOnMonth += monthChange;

    if(addedOnMonth === 0){
        yearChange -= 1
        addedOnMonth = 12;
    }

    const todaysYear = today.getYear();
    const thisYearArr = todaysYear.toString().split('');
    let addedOnYear = Number((thisYearArr[0] === '1' ? '20' : '19')+thisYearArr[1]+thisYearArr[2]);
    addedOnYear += yearChange;
    
    // &date=1995-06-16
    generatedDateFinal = `&date=${addedOnYear}-${addedOnMonth}-${addedOnDate}`;
    console.log(generatedDateFinal);
    return generatedDateFinal;
}

generateDate();

// good job so far, need to make randomImage function,
// I'd also like to add 4 buttons on the bottom to change the pic by changing the date. 
// Also don't allow moving forward if current date.
// add input for possibly choosing date of pic with button selector.
const previousButton = document.querySelector('#previousButton');
let previousTally = 0;
const previousButtonClick = previousButton.addEventListener('click', async(event) => {
    event.preventDefault();
    previousTally--;
    const pastDate = generateDate(previousTally);
    response = await fetch (`https://api.nasa.gov/planetary/apod?api_key=cQdEEJJw4GqFGHgquvNCdKMyHIjoUHtx5tp2N2ig` + `${pastDate}`);
    renderAstroPicOfDay(response);
}); 


const nextButton = document.querySelector('#nextButton');
let nextTally = 0
const nextButtonClick = nextButton.addEventListener('click', async(event) => {
    event.preventDefault();
    nextTally++;
    const nextDate = generateDate(nextTally);
    console.log(nextDate);
    if(nextDate === tomorrowsDate){
       alert(`I'm sorry Dave, I can't do that.`);
       return;
    }
    // console.log(nextDate)
    response = await fetch (`https://api.nasa.gov/planetary/apod?api_key=cQdEEJJw4GqFGHgquvNCdKMyHIjoUHtx5tp2N2ig` + `${nextDate}`);
    renderAstroPicOfDay(response);
}); 

const randomButton = document.querySelector('#randomButton');
// const randomButtonClick = () => {

// }

// const pickDateButtonClick = () => {

// }

// display the information in the browser
// Add a create button so the user can add to the information
// create way to add content
// Focus on code organization and cleanliness
// submit via 'fun-times' on slack