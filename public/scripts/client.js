/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// createTweetElement function
// takes in a tweet obj
// return article element containing the entire HTML structure
// data from /data-files/initial-tweets.json

$(() => {

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = (data) => {
  const dateDifference = Date.now() - data.created_at
  const passedDays = Math.floor(dateDifference / 86400000)

  const markup =
  `
  <article class="tweet">
    <header>
      <div class="user">
        <img src=${data.user} alt="" />
        <span id="username">${data.user.name}</span>
      </div>
    </header>
    <p>${data.content.text}</p>
    <footer>
      <div>${passedDays} days ago</div>
      <div>
      <i class="icon fa-solid fa-flag"></i>
      <i class="icon fa-solid fa-retweet"></i>
      <i class="icon fa-solid fa-heart"></i>
    </div>
    </footer>
  </article>
  `;

  return markup;
};

const $tweet = createTweetElement(tweetData);
console.log($tweet);
$('#tweets-container').append($tweet);

});

// <header>
// <div class="user">
//   <img src="/images/woman.png" alt="" />
//   <span id="username">Heesoo</span>
// </div>
// <span id="userid">@hspark</span>
// </header>
// <p>
// Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
// placeat, ipsa sint accusamus blanditiis maxime quas voluptate minus
// quibusdam porro officiis neque est possimus non temporibus aspernatur
// minima. Consequuntur, hic?
// </p>
// <footer>
// <div>10 dyas ago</div>