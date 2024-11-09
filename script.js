const apiurl = "https://quoteslate.vercel.app";

const nextbtn = document.querySelector(".nextmeme");
const setup = document.querySelector(".setup");
const tagname = document.querySelector(".tag-names");
const copy = document.querySelector(".copybtn");

async function populateDropdown() {
  try {
    const response = await fetch(apiurl + `/api/tags`);
    const tags = await response.json();
    
    tags.forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag;
      option.textContent = tag;
      tagname.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching or populating dropdown:", error);
  }
}


async function fetchJoke(tag) {
  try {
    const response = await fetch(apiurl + `/api/quotes/random?tags=` + tag);
    const data = await response.json();
    setup.innerHTML = '"' + data.quote + '"';
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
}


nextbtn.addEventListener("click", () => {
  const selectedTag = tagname.value;
  fetchJoke(selectedTag);
});


window.addEventListener("load", () => {
  populateDropdown();
  fetchJoke(tagname.value); 
});

copy.addEventListener("click", () => {

  var copyText = setup.innerHTML;
  navigator.clipboard.writeText(copyText);
  alert("Copied!");
});
// vaibhav sharma
