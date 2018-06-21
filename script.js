// Code out an event listener for the button that logs "Button pressed!" to the console when it is clicked
let button = document.querySelector("#mainButton")
let clear = document.querySelector("#clearButton")
let input = document.getElementById("input")
let counter = -1

button.addEventListener('click', e => {
  counter += 1
  counter = counter % 30
  console.log("button!!!")
  sendApiRequest()
})

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    button.click();
  }
});

clear.addEventListener('click', e => {
  document.querySelector("#wrapper").innerHTML = ""
})

// Go to tenor.com and create an account. Then create your first app called testApp to create an API key. Enter it below.

function sendApiRequest() {
  var apikey = "RFITWYZQHK7O"
  var lmt = 30
  var search_term = input.value
  var search_url = "https://api.tenor.com/v1/search?tag=" + search_term + "&key=" + apikey + "&limit=" + lmt + "&safesearch=strict";

  fetch(search_url).then(function(data) {
      return data.json();
    })
    .then(function(json) {
      console.log(json);
      // Pass the JSON on to the next function.
      getImageURLfrom(json)
    });
};


// Get a specific image URL ending in .gif from your JSON search results. Pass it on to the next function.
function getImageURLfrom(myJSON) {
  const imageURL = myJSON.results[counter].media["0"].gif.url
  console.log(imageURL)
  addImageToScreen(imageURL)
};

// querySelect the wrapper, and add an image tag to it. Interpolate the URL string from the previous function.
function addImageToScreen(myURL) {
  const wrapper = document.querySelector("#wrapper")
  console.log(wrapper)
  wrapper.innerHTML += `<img src='${myURL}' alt="" height=200px>`
};

// Playtime challenges:
// Find something / someone else (rewrite the searchterm so that we aren't searching for corgi)
// Instead of getting the first image, get a random image from the JSON results
// Add another button to view a different image for that search term.
// REPLACE the contents of the wrapper instead of adding onto them
// Make all your images the same height so that they line up nicely
// Button to reset the screen
