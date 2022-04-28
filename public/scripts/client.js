/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { format } = require("express/lib/response");


$(() => {
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then((tweets) => {
      $('#tweets-container').empty();
      renderTweets(tweets);
    })
  }



  const createTweetElement = (data) => {

    const passedDays = timeago.format(data.created_at);

    const $header = $(`
      <header>
        <div class="user">
          <img src=${data.user.avatars} alt="" />
          <span id="username">${data.user.name}</span>
        </div>
       </header>`);
    const $footer = $(`
      <footer>
        <div>${passedDays}</div>
        <div>
          <i class="icon fa-solid fa-flag"></i>
          <i class="icon fa-solid fa-retweet"></i>
          <i class="icon fa-solid fa-heart"></i>
        </div>
      </footer>
    `);
    const $content = $('<div>').text(data.content.text);
    const $tweet = $('<article>').addClass('tweet');
    $tweet.append($header, $content, $footer);

    return $tweet;
  };

  $('#new-tweet-content').on('submit', function(event) {
    event.preventDefault();
    console.log('Form submitted!')

    const words = $("#tweet-text").val();
    const data = $(this).serialize();

    if (words === "" || words === null || words.length > 140) {
      alert("Please write proper tweet under 140 characters")
      $('#tweet-text').val('');
      return $('#counter').text(0).css({'color' : 'rgb(110,110,110)'});
    }

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data
    }).then((data) => {
      loadTweets();
      $('#tweet-text').val('');
      return $('#counter').text(0).css({'color' : 'rgb(110,110,110)'});
    })
  })

});

