/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  // submit button action override - send data to server
  $("form").on("submit", submitTweet);

  loadTweets();
});


//take the functions and put them in a helper.js file in scripts (link it in the html)
const submitTweet = function(event) {
  event.preventDefault();
  let formData = $(this).serialize();              //the server is configured to receive data as a query string
  let $text = $('#tweet-text').val();

  if ($text === "") {
    $('.empty-tweet-err').slideDown("slow");
    $('.long-tweet-err').hide();
  } else if ($text.length > 140) {
    $('.long-tweet-err').slideDown();
    $('.empty-tweet-err').hide();
  } else {
    $.post("/tweets", formData)
      .then(() => {
        $('.posted-tweets').empty();
        loadTweets();
        $('#tweet-text').val("");
        $('.empty-tweet-err').slideUp("slow");
        $('.long-tweet-err').slideUp("slow");
        $('.counter').text(140);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const loadTweets = function() {
  $.get("/tweets")
    .then(response => {
      renderTweets(response);
    })
    .catch(err => {
      console.log(err.message);
    });
};

const renderTweets = function(tweets) {
  for (let tweetData of tweets) {
    let $tweet = createTweetElement(tweetData);
    $('.posted-tweets').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};


//using jQuery to create new HTML elements would remove the need to escape the XSS (.text)
const createTweetElement = function(tweetData) {
  const $tweet = $("<article>");
  const $tweetHeader = $("<header>");
  const $tweetSpan = $("<span>");
  const $tweetUserAvatar = $("<img>");
  const $tweetAuthor = $("<h3>");
  const $tweetHandle = $("<h4>");
  const $tweetContentContainer = $("<section>");
  const $tweetContent = $("<p>");
  const $tweetFooter = $("<footer>");
  const $tweetPostTime = $("<p>");
  const $tweetIconDiv = $("<div>");
  const $tweetIconOne = $("<i>");
  const $tweetIconTwo = $("<i>");
  const $tweetIconThree = $("<i>");

  $tweetHeader.attr("class", "tweet");
  $tweetUserAvatar.attr({"src": `${tweetData.user.avatars}`, "class": "avatar"});
  $tweetAuthor.text(`${tweetData.user.name}`);
  $tweetHandle.text(`${tweetData.user.handle}`);
  $tweetContent.attr("class", "tweet-content");
  $tweetContent.text(`${tweetData.content.text}`);
  $tweetFooter.attr("class", "tweet")
  $tweetPostTime.text(`${timeago.format(tweetData.created_at)}`);
  $tweetIconOne.attr("class", "fa-solid fa-flag")
  $tweetIconTwo.attr("class", "fa-solid fa-repeat")
  $tweetIconThree.attr("class", "fa-solid fa-heart")

  $tweet.append($tweetHeader);
  $tweetHeader.append($tweetSpan);
  $tweetSpan.append($tweetUserAvatar);
  $tweetSpan.append($tweetAuthor);
  $tweetHeader.append($tweetHandle);
  $tweet.append($tweetContentContainer);
  $tweetContentContainer.append($tweetContent);
  $tweet.append($tweetFooter);
  $tweetFooter.append($tweetPostTime);
  $tweetFooter.append($tweetIconDiv);
  $tweetIconDiv.append($tweetIconOne);
  $tweetIconDiv.append($tweetIconTwo);
  $tweetIconDiv.append($tweetIconThree);

  return $tweet;
};