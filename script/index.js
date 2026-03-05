//12
const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
  };


//2
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLesson(json.data));
};

//8
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  //   console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

//4
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((JsonResponse) => {
      //9
      removeActive(); //Remove all active class

      //7
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active"); //Add only add remove class on clicked button

      displayLevelWord(JsonResponse.data);
    });
};

//10
const loadWordDetail = async(id) =>{
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url);
  const response = await fetch(url);
  const details = await response.json();
  displayWordDetails(details.data);
}

//11
const displayWordDetails = (word) => {
  // console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
    
    
    `;
  document.getElementById("word_modal").showModal();
};

//5.Display each lesson card when specific lesson btn clicked
const displayLevelWord = (words) => {
  // console.log(word)
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  //6.If any lessons have no words to display
  if (words.length === 0) {
    wordContainer.innerHTML = `<div class="text-center col-span-full rounded-xl py-10 space-y-4">
    <img src="./assets/alert-error.png" alt="" class="mx-auto">
        <p class=" font-bangla text-xl font-normal text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bangla font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        
    </div>`;

    return;
  }

  // Took from console   so that i can use these property name as reference to make dynamic word
  //     {
  //     "id": 81,
  //     "level": 1,
  //     "word": "Ball",
  //     "meaning": "বল",
  //     "pronunciation": "বল"
  // }

  words.forEach((word) => {
    // console.log(word);

    const card = document.createElement("div");
    card.innerHTML = `
        <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="font-semibold">Meaning /Pronunciation</p>
        <div class="text-2xl font-medium font-bangla">"${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
          word.pronunciation
            ? word.pronunciation
            : "Pronunciation পাওয়া  যায়নি"
        }"</div> 
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button  class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
        
        `;

    wordContainer.append(card);
  });
};

//3.For create all lesson btn and show them in my UI
const displayLesson = (lessons) => {
  // 1.Get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2.Get into every lessons
  for (let lesson of lessons) {
    // 3.Create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button> `;

    // 4.append into container
    levelContainer.append(btnDiv);
  }
};
//1
loadLessons();
