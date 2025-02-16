$(document).ready(() => {


 // helper function to convert timestamp into readable format
const timeAgo = function(timestamp) {
  const now = Date.now();
  const differenceInMilliseconds = now - timestamp;
  const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  return differenceInDays === 0 ? "Today" : `${differenceInDays} day(s) ago`;
};

  const createTweetElement = function(tweet) {
    const timeAgoText = timeAgo(tweet.created_at);
    const $tweet = $(
      `<article class="tweet-box">
    <!-- header will contain user info -->
    <header>
      <div class="user-box">
        <img src= ${tweet.user.avatars} alt="user avatar">
        <span class="tweet-name"> ${tweet.user.name} </span>
      </div>
      <span class="tweet-username">${tweet.user.handle}</span>
    </header>

    <p class="tweet-contents"> ${tweet.content.text}</p>

    <!-- footer will have timestamps -->
    <footer>
      <span class="timestamp">${timeAgoText}</span>
      <div class="icons">
        <i class="fa-solid fa-flag hover-effect"></i>
        <i class="fa-solid fa-retweet hover-effect"></i>
        <i class="fa-solid fa-heart hover-effect"></i>
      </div>
    </footer>
  </article>`)

    return $tweet
  }

// param @ array of tweets
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet); // loop through data and generate HTML for each tweet
      $("#tweets-container").prepend($tweet);
    }
  }


  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants.",
      },
      created_at: 1461116232227,
    }
    // Add more tweets if you want!
  ];
  
  renderTweets(data);
})

$(".tweeter-form").on("submit", function(event) {
  event.preventDefault(); //prevents page from refreshing
  console.log("form submitted") // testing code
});
