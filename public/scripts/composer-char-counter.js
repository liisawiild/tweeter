$(document).ready(function() {
  console.log("Doc is ready!");

  // let textarea = document.getElementById('tweet-text');
  // let counter = Number(document.getElementsByClassName('counter')[0].innerHTML);

  $('#tweet-text').on('input', function() {
    let inputChar = $(this).val().length;
    let remainingChar = 140 - inputChar
    $('.counter').text(remainingChar);                            //will replace inner text with text provided in func

  });

});