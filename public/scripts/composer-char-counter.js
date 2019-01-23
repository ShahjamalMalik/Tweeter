$(document).ready(function() {

  $("textarea").on("keypress", function(e) {


    if ($("textarea").val().length > 140) {
      $(".counter").css('color', 'red');
    }
    else {
      $(".counter").css('color', 'black');
      }

    $('.counter').text(140 - $(this).val().length);

  });
});