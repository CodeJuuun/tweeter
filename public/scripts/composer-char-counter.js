// ensures DOM has been loaded
$(document).ready(function() {
  console.log("DOM is loaded");

  // declared variable via jquery syntax
  const $textarea = $(".new-tweet textarea");

  // logging  just "this" will display the entire DOM element
  $textarea.on("input", function() {
    const maxLength = 140;
    const lengthOfText = $(this).val().length;
    const remainder = maxLength - lengthOfText;
    console.log("characters typed:", lengthOfText, remainder);

    // traverse DOM tree to find node element that matches ".counter" relative to the textarea
    const $counter = $(this).closest(".new-tweet").find(".counter");
  
    // update counter
    $counter.text(remainder);
  
    if (remainder < 0) {
      $counter.addClass("over-char-limit");
    } else {
      $counter.removeClass("over-char-limit");
    }
  });
});

