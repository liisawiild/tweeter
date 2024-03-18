/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

  // Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
 
  const renderTweets = function(tweets) {
    for (let tweetData of tweets) {
      let $tweet = createTweetElement(tweetData);
      $('.posted-tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  }

  const createTweetElement = function(tweetData) {
    const $tweet = $(`<article>
    <header class="tweet">
      <span>
        <img class="avatar" src="${tweetData.user.avatars}">
        <h3>${tweetData.user.name}</h3>
      </span>
      <h4>${tweetData.user.handle}</h4>
    </header>
    <section class="tweet-content">
      <p>${tweetData.content.text}</p>
    </section>
    <footer class="tweet">
      <p>${tweetData.created_at}</p>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-repeat"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
  
  return $tweet; 
}

renderTweets(data);


});




