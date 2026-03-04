//2
const loadLessons = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")  //promise of response 
    .then((res)=> res.json()) //promise of json data
    .then((json)=> displayLesson(json.data))
};

//4
const LoadLevelWord = (id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);
    fetch(url)
    .then((res)=> res.json())
    .then((JsonResponse)=> displayLevelWord(JsonResponse.data))
}
//5.Display each lesson card when specific lesson btn clicked
const displayLevelWord = (words)=>{
    // console.log(word)
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    // Took from console   so that i can use these property name as reference to make dynamic word
//     {
//     "id": 81,
//     "level": 1,
//     "word": "Ball",
//     "meaning": "বল",
//     "pronunciation": "বল"
// }

    words.forEach(word => {
        console.log(word);

        const card = document.createElement('div');
        card.innerHTML = `
        <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"
    }"</div> 
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${
            word.id
          })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick="pronounceWord('${
            word.word
          }')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
        
        `;

        wordContainer.append(card);

        
    });
};

//3.For create all lesson btn and show them in my UI
const displayLesson = (lessons)=> {
    // 1.Get the container & empty
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    // 2.Get into every lessons
    for(let lesson of lessons){
        // 3.Create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick = "LoadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button> `

        // 4.append into container 
        levelContainer.append(btnDiv);
    }
}
//1
loadLessons();