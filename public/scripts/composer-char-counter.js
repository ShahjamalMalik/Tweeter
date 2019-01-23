$(document).ready(function() {

  $("textarea").on("keyup", function(e) {
    $('.errorBlank').addClass("hidden");

    if ($("textarea").val().length > 140) {
      $(".counter").css('color', 'red');
    }
    else {
      $(".counter").css('color', 'black');
      $('.error140').addClass("hidden");
    }

    $('.counter').text(140 - $(this).val().length);

  });
});