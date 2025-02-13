// ensures DOM has been loaded
$(document).ready(function() {
  console.log("DOM is loaded")

// declared variable via jquery syntax
  const $textarea = $(".new-tweet textarea");

  // logging "this" will display the entire DOM element
  $textarea.on("input", function() { 
    const lengthOfText = $(this).val().length
    console.log("characters typed:", lengthOfText)
  })
});

