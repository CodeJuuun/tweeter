$(document).ready(() => {

  $("error-message").hide();

  // function to valid check the tweets
  const isTweetValid = function(tweetText) {
    if (!tweetText) {
      $("#error-message").text("You gotta write something first!").slideDown(300);
      return false;
    }

    if (tweetText.length > 140) {
      $("#error-message").text("You've gone beyond the 140 character limit, keep it short!").slideDown(300);
      return false;
    }
    return true;
  };
  // function to convert timestamp into readable format
  //------------------------------------------------------------------
  const timeAgo = function(timestamp) {
    return timeago.format(timestamp);
  };
  //------------------------------------------------------------------
  // will create a dynamically changing html
  const createTweetElement = function(tweet) {
    const timeAgoText = timeAgo(tweet.created_at);
    const $tweet = $(
      `<article class="tweet-box">
    <!-- header will contain user info -->
    <header>
      <div class="user-box">
        <img src= "${tweet.user.avatars}" alt="user avatar">
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
  </article>`);

    // XSS security added
    $(".tweet-contents", $tweet).text(tweet.content.text);
    return $tweet;
  };
  //------------------------------------------------------------------
  // render the actual html onto the web page
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };
  //------------------------------------------------------------------
  // will fetch (GET) the tweets, making a request to the server to receive the array of tweets as JSON
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (data) => {
        renderTweets(data);
      },
      error: (err) => {
        console.error("Error loading tweets:", err);
      }
    });
  };
  loadTweets();
  //------------------------------------------------------------------
  // handle form submission and validates tweet input via AJAX
  $(".tweeter-form").on("submit", function(event) {
    event.preventDefault();

    const tweetText = $("#tweet-text").val().trim();

    $("#error-message").slideUp(200).text("");

    if (!isTweetValid(tweetText)) {
      return;
    }

    const formData = $(this).serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formData,
      success: () => {
        loadTweets();
        $("#tweet-text").val('');
        $(".counter").text(140);
      },
      error: (err) => {
        console.error("There was an error posting the tweet", err);
      }
    });
  });
});
