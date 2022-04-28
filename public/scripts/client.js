/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

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
    const $content = $('<div class="content">').text(data.content.text);
    const $tweet = $('<article>').addClass('tweet');
    $tweet.append($header, $content, $footer);

    return $tweet;
  };

  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }

  // when get request occur, create tweet and prepend it to container and show them
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then((tweets) => {
      $('#tweets-container').empty();
      renderTweets(tweets);
    })
  }

  // when press the "write new tweet", toggle textarea
  $('.write').click(() => {
    $('.new-tweet-container').slideToggle(100);
  })

  //when scroll down, show up arrow
  $(this).scroll(() => {
    const $scroll = $(this).scrollTop();
    if ($scroll > 100) {
      $('.top').fadeIn()
    } else {
      $('.top').fadeOut();
    }
  });

  // press tweet button for Posting
  $('#new-tweet-content').on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();

    // check textarea input length
    const words = $("#tweet-text").val();
    if (words === "" || words === null || words.length > 140) {
      return $('.warning').slideDown("slow");
      // return $('#counter').css({'color' : 'rgb(110,110,110)'});
    }

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data
    }).then((data) => {
      loadTweets();
      $('.warning').slideUp();
      $('#tweet-text').val('');
      return $('#counter').text(140).css({'color' : 'rgb(110,110,110)'});
    })
  })

});

