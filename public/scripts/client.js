$(document).ready(() => {
  // helper function to convert timestamp into readable format

  const timeAgo = function(timestamp) {
    return timeago.format(timestamp);
  };

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

    return $tweet;
  };

  // render the actual html onto the web page
  // param @ array of tweets
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet); // loop through data and generate HTML for each tweet
      $("#tweets-container").prepend($tweet);
    }
  }

  // will fetch (GET) the tweets, making a request to the server to receive the array of tweets as JSON
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (data) => {
        console.log("Tweet posted!"); // debugging log
        renderTweets(data);
      },
      error: (err) => {
        console.error("Error loading tweets:", err);
      }
    });
  };
  loadTweets();


  // helper function to valid check the tweets
  const isTweetValid = function(tweetText) {
  // add validation check first- if there is no text
    if (!tweetText) {
      alert("Tweet cannot be empty");
      return false; // must include return to stop from submitting
    }

    if (tweetText.length > 140) {
      alert("Cannot exceed 140 characters");
      return false;
    }
    return true;
  };
  
  $(".tweeter-form").on("submit", function(event) {
    event.preventDefault(); //prevents page from refreshing
    const tweetText = $("#tweet-text").val().trim();  //grab tweet text

    // use helper function
    if (!isTweetValid(tweetText)) {
      return;
    }

    const formData = $(this).serialize(); //any input will be taken and converts them into a query string format, (text=hello%20world)
    console.log("form submitted", formData); // testing code

    $.ajax({
      method: "POST",
      url:"/tweets",
      data: formData,
      success: () => {
        console.log("Tweet posted successfully!"); // debugging log
        loadTweets();
        $("#tweet-text").val(''); // clears input field after submitting
      },
      error: (err) => {
        console.error("There was an error posting the tweet", err);
      }
    });
  });
});
