$(document).ready(function () {
  console.log("Doc is ready!");

  $('#tweet-text').on('input', function () {
    let inputChar = $(this).val().length;
    let remainingChar = 140 - inputChar
    $('.counter').text(remainingChar);

    if (remainingChar < 0) {
      $('.counter').addClass('negative');
    } else {
      $('.counter').removeClass('negative');
    }

  });

});