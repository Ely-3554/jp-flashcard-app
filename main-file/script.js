
generateNewWord(); // Generate a new word when the page loads

let romajiElement = document.getElementById('front-romaji');  // Select the Romaji element

function generateNewWord(index = null) {
    //pause before generating a new word
    setTimeout(() => {
    
        // flip the card back to the front
        document.querySelector('.the-card').style.transform = 'rotateY(0deg)';
        
        fetch('https://jlpt-vocab-api.vercel.app/api/words/all') //?level=5
        .then(response => response.json())
        .then(data => {
            let word = index ? data[index] : data[Math.floor(Math.random() * data.length)]; // Get a random word
            let furigana = word.furigana ? word.furigana : '';  
       
            // unchecked the checkbox and hide the romaji
            // document.getElementById('show-romaji').checked = false;
            // document.getElementById('front-romaji').style.display = 'none';

        // display the total length of the array
        document.getElementById('item-counter').textContent = `Item ${data.indexOf(word) + 1} of ${data.length}`;

        // FRONT SIDE OF THE CARD
            // show the header of the card
            document.getElementById('front-header').textContent = "Vocabulary";

            // change the word of the front-header
            document.getElementById('front-word').textContent = word.word;

            // change the word of the furigana
            furigana ? document.getElementById('front-furigana').textContent = `(${furigana})` : document.getElementById('front-furigana').textContent = "";

            // change the word of the romaji
            document.getElementById('front-romaji').textContent = word.romaji;

        // BACK SIDE OF THE CARD
            // change the word of the n-level
            document.getElementById('n-level').textContent = `N${word.level} Level`;
            // change the word of the back-word
            document.getElementById('back-word').textContent = word.word;

            // change the word of the furigana-word
            furigana ? document.getElementById('back-furigana').textContent = `Furigana: ${furigana}`: document.getElementById('back-furigana').textContent = `Furigana: - `;

            // change the word of the romaji-word
            document.getElementById('back-romaji').textContent = `Romaji: ${word.romaji}`;

            // change the word of the back-word
            document.getElementById('back-meaning-content').textContent = word.meaning;

            // document.getElementById('api-flashcard-back').innerHTML = ` `;
        })
        .catch(error => console.error('Error fetching data:', error));
        
    } ,100);
}

document.addEventListener("DOMContentLoaded", function () {
    generateNewWord(); // Generate a new word when the page loads

    let romajiElement = document.getElementById('front-romaji');  
    let checkbox = document.getElementById('show-romaji');

    // Function to show/hide romaji
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            romajiElement.style.display = 'block'; // Show Romaji
        } else {
            romajiElement.style.display = 'none'; // Hide Romaji
        }
    });
});