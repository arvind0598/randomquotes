import './main.css'; //for webpack

const BACKGROUND_COLORS = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857'];

/**
 * Element references
 */

const generateQuoteButton = document.getElementById('generate-random-quote-button');
const tweetButton = document.getElementById('tweet-button');
const quoteBody = document.getElementById('quote');
const authorBody = document.getElementById('author');

/**
 * @description
 * Updates the tweet button href with the new quote body.
 * Called once a new quote is fetched.
 * NOTE: Did this instead of adding an event listener to the tweet button.
 * 
 * @param {string} quote quote text 
 */

const updateTweetText = (quote) => {
  let quoteText = quote;
  if(quoteText.length > 140)
    quoteText = quote.substring(0, 137) + '...';
  let encodedQuoteText = encodeURI(quoteText);
  tweetButton.setAttribute('href', `https://twitter.com/intent/tweet/?text=${encodedQuoteText}`);
};

/**
 * @description
 * Chooses one colour from the array at random.
 * Updates the body background with the chosen color.
 * Called when a new quote is fetched.
 */
const updateBackground = () => {
  const luckyColor = Math.floor(Math.random() * BACKGROUND_COLORS.length);
  document.body.style.backgroundColor = BACKGROUND_COLORS[luckyColor];
};

/**
 * @summary
 * Updates the quote and author.
 * Called when a new quote is fetched.
 * 
 * @param {string} quoteText 
 * @param {string} authorText 
 */
const updateQuoteText = (quoteText, authorText) => {
  quoteBody.innerText = `"${quoteText}"`;
  authorBody.innerText = authorText;
};

/**
 * @summary
 * Fetches a new quote and calls other functions.
 * Uses https://github.com/lukePeavey/quotable
 */
const updateQuote = () => {
  generateQuoteButton.classList.add('active');
  fetch('https://api.quotable.io/random')
    .then(res => res.json())
    .then(data => {
      generateQuoteButton.classList.remove('active');
      updateQuoteText(data.content, data.author);
      updateBackground();
      updateTweetText(data.content);
    })
    .catch(err => console.error(err));
};

generateQuoteButton.addEventListener('click', updateQuote);

window.onload = updateQuote();
