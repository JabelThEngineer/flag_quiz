
// Questions

const questions = [
    {
        flag: "images/flag1.gif",
        answers: ['Poland', 'Austria', 'Monaco', 'Albania'],
        correct: 3
    },
    {
        flag: "images/flag2.gif",
        answers: ['Bosnia and Herzegovina', 'Argentina', 'El Salvador', 'Izrael'],
        correct: 1
    },
    {
        flag: "images/flag3.gif",
        answers: ['Morocco', 'Monaco', 'China', 'Turkey'],
        correct: 2
    },
    {
        flag: "images/flag4.gif",
        answers: ['France', 'Uruguay', 'Russia', 'Qatar'],
        correct: 0
    },
    {
        flag: "images/flag5.gif",
        answers: ['Argentina', 'Israel', 'Nicaragua', 'Greece'],
        correct: 1
    },
    {
        flag: "images/flag6.gif",
        answers: ['Croatia', 'Armenia', 'Romania', 'Bulgaria'],
        correct: 2
    },
    {
        flag: "images/flag7.gif",
        answers: ['Australia', 'Malaysia', 'New Zealand', 'USA'],
        correct: 3
    },
    {
        flag: "images/flag8.gif",
        answers: ['Poland', 'Russia', 'Thailand', 'Luxembourg'],
        correct: 1
    },
    {
        flag: "images/flag9.gif",
        answers: ['Indonesia', 'Malta', 'Singapore', 'Japan'],
        correct: 3
    },
    {
        flag: "images/flag10.gif",
        answers: ['Côte d\'Ivoire', 'Austria', 'India', 'Ireland'],
        correct: 2
    },
]

// Logical part

let currentIndex = 0; // used to iterate through all of the questions from array
let score = 0;  // keeps user's score

const queNum = document.querySelector(".questions_number");     // HTML element, where question's numbers will be changed
const flagImg = document.querySelector(".questions_space img");     // will be used to address the images' change 
const answerButtons = document.querySelectorAll(".answers button"); // will be used to assign answers and check what's clicked

// renders one question on screen at a time
function showQuestion() {   // Function used to iterate through all of the questions
    let iterator = 0;   // 
    const q = questions[currentIndex]; // takes the whole object (question) from array

    queNum.textContent = `Question ${currentIndex + 1}: `; // we set the question's content (h2)

    flagImg.src = q.flag; // assigning the question's image

    // Updating question's possible answers
    answerButtons.forEach(button => {       
        button.textContent = q.answers[iterator];   // assigning questions one after another
        iterator++; // allows to target answers[0], ...[1] etc. questions
    });
}

// Here points are counted and the score panel is appearing (after the quiz ends)
answerButtons.forEach((btn, i) => {   
    btn.addEventListener("click", () => {       // assigning every button a event listener and defining what happens after clicking
        const q = questions[currentIndex];

        if (i === q.correct) {      // here we check whether index of clicked button is the same as index of correct answer
            btn.classList.add("correct");   // adding 'correct' class styling to button
            score++;    // increasing user's score
        } else {
            btn.classList.add("wrong"); // otherwise adding 'wrong' styling to button
            
            answerButtons[q.correct].classList.add("correct");  // and if user clicked the wrong button, correct one shows up too
        }

        answerButtons.forEach(b => b.disabled = true);  // blocks possibility of clicking other buttons till the question changes

        // 
        setTimeout(() => {
            currentIndex++; // increases questions counter
            // checks if the current question wasn't the last, if not...
            if(currentIndex < questions.length) {   
                answerButtons.forEach(b => {
                    b.classList.remove("correct", "wrong"); // we remove additional styling from buttons that we assigned to previous question
                    b.disabled = false; // turning off the clicking blockade
                });

                showQuestion(); // we can show the next question

            } // and if it was the last question it takes away the quiz panel and shows the result section
            else {
                document.querySelector(".questions").style.display = "none"; // hididng questions section

                const resultSection = document.querySelector(".result");
                resultSection.style.display = "block";  // showing result panel

                resultSection.querySelector('.score_text').textContent = 
                `${score} / ${questions.length}`;   // printing the result x / 10

            }
        }, 1000);   // One second break to see the correct/ correct and incorrect values
    });
});

showQuestion();

// Used to come back to quiz game panel
// Restarts the quiz when the 'start again button is clicked + resets control variables
document.querySelector(".restart_button").addEventListener("click", () => { 
    currentIndex = 0;
    score = 0;

    document.querySelector(".result").style.display = "none";       // hides result panel
    document.querySelector(".questions").style.display = "flex";    // shows again question

    // Restarting buttons' stylings and blockade
    answerButtons.forEach(b => {
        b.classList.remove("correct", "wrong");
        b.disabled = false;
    });

    showQuestion(); // shows questions afresh
});