function renderTweets(tweets) {
  for (let id of tweets) {
    $("#tweets").prepend(createTweetElement(id));
  }
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function createTweetElement(obj) {
  let article = `
  <article class="tweet">
        <header>
          <img src=${obj.user.avatars.small}>
          <h1>${obj.user.name}</h1>
          <h2>${obj.user.handle}</h2>
        </header>
        <div class="tweet-content">
          <p>
            ${escape(obj.content.text)}
          </p>
        <footer>
          <p id="yo">
            ${obj.created_at}
          </p>
          <div class="animation">
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
        </div>
       </footer>
   </article>
`;
  let $tweet = $(article);
  return $tweet;
}

$(document).ready(function() {

  let loadTweets = function() {
    $('#tweets').empty();
    $.ajax("/tweets", {method: 'GET'})
    .then(function (tweets) {
      renderTweets(tweets);
    });
  };
  loadTweets();


  var $submitTweet = $('.submitTweet');

  $submitTweet.submit(function (event) {
    event.preventDefault();
    let $tweetContent = $(this);
    let submitable = checkTweet();

    if (submitable) {
      $.ajax('/tweets', {
        method: 'POST',
        data: $tweetContent.serialize()
      })
      .done(function() {
        loadTweets();
      });
    }
  });

  const checkTweet = function () {
    let checkTextArea = $('.textArea').val();

    if (checkTextArea === '' || checkTextArea === null) {
      $('.errorBlank').removeClass("hidden");
      return false;

    } else if (checkTextArea.length > 140) {
      $('.error140').removeClass("hidden");
        return false;
    } else {
        return true;
      }
  };

 $(".new-tweet").hide();
 $('.large-button').click(function() {
   $('.new-tweet').slideToggle('fast');
 });
});

