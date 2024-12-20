const search = document.querySelector(".search");
const word = document.querySelector(".word");
const searchedWord = document.querySelector(".searchedWord");
const pos = document.querySelector(".pos");
const phonetics = document.querySelector(".phonetics");
const definition = document.querySelector(".definition");
const box = document.querySelector(".box");
const notFound = document.querySelector(".notFound");

word.focus();
const searchDefinition = function () {
  if (word.value) {
    document.querySelector(".container").classList.remove("hidden");
    dataRender();
  }
};

word.addEventListener("keydown", function (e) {
  if (e.key === "Enter") searchDefinition();
});

const dataRender = async function () {
  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`;
    const response = await fetch(url);
    const [data] = await response.json();
    console.log(data);
    const { partOfSpeech } = data.meanings[0];
    const { phonetic } = data;
    const definitions = data.meanings[0].definitions[0].definition;

    searchedWord.textContent = data.word;
    pos.textContent = partOfSpeech;
    phonetics.textContent = phonetic;
    definition.textContent = definitions;
  } catch (e) {
    const html = `<h1>No Results Found for ${word.value}</h1>`;
    box.innerHTML = html;
  }
};
