/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // submit button action override - send data to server
  $("form").on("submit", submitTweet)

  loadTweets();
});

const submitTweet = function (event) {
  event.preventDefault();
  let formData = $(this).serialize();
  let $text = $('#tweet-text').val();

  if ($text === "") {
    alert("No tweet content was submitted. Please try again");
  } else if($text.length > 140) {
    alert("You have too much to say. Say less.");
  } else {
    $.post("/tweets", formData)
      .then(() => {
        $('.posted-tweets').empty();
        loadTweets();
        $('#tweet-text').val("");
      })
      .catch((err) => {
        console.log(err);
      });
    };
};

const loadTweets = function () {
  $.get("/tweets")
    .then(response => {
      renderTweets(response);
    })
    .catch(err => {
      console.log(err.message)
    })
}

const renderTweets = function (tweets) {
  for (let tweetData of tweets) {
    let $tweet = createTweetElement(tweetData);
    $('.posted-tweets').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
}

const escape = function(str) {
  let section = document.createElement("section");
  section.appendChild(document.createTextNode(str));
  return section.innerHTML;
}

const createTweetElement = function (tweetData) {
  const $tweet = $(`<article>
            <header class="tweet">
              <span>
                <img class="avatar" src="${tweetData.user.avatars}">
                <h3>${tweetData.user.name}</h3>
              </span>
              <h4>${tweetData.user.handle}</h4>
            </header>
            <section class="tweet-content">
              <p>${escape(tweetData.content.text)}</p>
            </section>
            <footer class="tweet">
              <p>${timeago.format(tweetData.created_at)}</p>
              <div>
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-repeat"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer>
          </article>`);

  return $tweet;
}

//Jurassic ajax syntax
  // $.ajax({
  //   type: "POST",
  //   url: "/tweets",
  //   data: formData,
  //   success: function(response) {
  //     console.log("Data submitted successfully");
  //     // loadTweets();
  //   },
  //   error: function(error) {
  //     console.log("Error submitting data:", error);
  //   }
  // })

  
  // $.ajax({
  //   type: "GET",
  //   url: "/tweets",
  //   success: function(response) {
  //     console.log("Data gathered successfully");
  //     renderTweets(response);
  //   },
  //   error: function(error) {
  //     console.log("Error gathering data:", error);
  //   }
  // })