/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  loadTweets();

  $("form").on("submit", submitTweet);

  $(".nav-tweet-btn").on("click", toggleNewTweet);

});


