let current = 0;

let answers = new Array(questions.length).fill(null);

let review = new Array(questions.length).fill(false);

let examStarted = false;

let submitted = false;

let timeLeft = 60 * 60; // 1 hour

let timerInterval = null;


// ==============================
// START EXAM
// ==============================

function startExam() {

    examStarted = true;

    document.getElementById("introScreen").style.display = "none";

    document.getElementById("examScreen").style.display = "block";

    current = 0;

    loadQuestion();

    startTimer();
}


// ==============================
// TIMER
// ==============================

function startTimer() {

    updateTimer();

    timerInterval = setInterval(function () {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            alert("Time is over. Your exam will be submitted automatically.");

            submitExam(true);

        }

    }, 1000);
}


function updateTimer() {

    let minutes = Math.floor(timeLeft / 60);

    let seconds = timeLeft % 60;

    let displayMinutes = String(minutes).padStart(2, "0");

    let displaySeconds = String(seconds).padStart(2, "0");

    document.getElementById("timer").innerText =
        displayMinutes + ":" + displaySeconds;
}


// ==============================
// LOAD QUESTION
// ==============================

function loadQuestion() {

    if (!examStarted) {
        return;
    }

    let q = questions[current];

    document.getElementById("question").innerText =
        "Q" + (current + 1) + ". " + q.question;


    let optionsHTML = "";

    let natHTML = "";


    // MCQ / MSQ

    if (q.type === "MCQ" || q.type === "MSQ") {

        q.options.forEach(function(opt, i) {

            let checked = "";

            if (q.type === "MCQ") {

                checked =
                    answers[current] === i
                    ? "checked"
                    : "";

            }

            if (q.type === "MSQ") {

                if (
                    Array.isArray(answers[current]) &&
                    answers[current].includes(i)
                ) {

                    checked = "checked";

                }

            }


            let inputType =
                q.type === "MCQ"
                ? "radio"
                : "checkbox";


            optionsHTML += `
                <label class="option">
                    <input
                        type="${inputType}"
                        name="option"
                        value="${i}"
                        ${checked}>
                    ${opt}
                </label>
            `;

        });

    }


    // NAT

    if (q.type === "NAT") {

        let existingAnswer =
            answers[current] !== null
            ? answers[current]
            : "";

        natHTML = `

            <div class="nat-container">

                <p>
                    Enter your answer. Answer may be entered
                    up to 2 decimal places.
                </p>

                <input
                    type="number"
                    step="0.01"
                    id="natAnswer"
                    value="${existingAnswer}"
                    placeholder="Enter answer">

            </div>

        `;

    }


    document.getElementById("options").innerHTML =
        optionsHTML;

    document.getElementById("natInput").innerHTML =
        natHTML;


    updatePalette();

}


// ==============================
// SAVE ANSWER
// ==============================

function saveCurrentAnswer() {

    let q = questions[current];


    // MCQ

    if (q.type === "MCQ") {

        let selected =
            document.querySelector(
                'input[name="option"]:checked'
            );

        if (selected) {

            answers[current] =
                parseInt(selected.value);

        }

    }


    // MSQ

    else if (q.type === "MSQ") {

        let selected =
            document.querySelectorAll(
                'input[name="option"]:checked'
            );

        let selectedAnswers = [];

        selected.forEach(function(input) {

            selectedAnswers.push(
                parseInt(input.value)
            );

        });

        answers[current] =
            selectedAnswers.length > 0
            ? selectedAnswers
            : null;

    }


    // NAT

    else if (q.type === "NAT") {

        let input =
            document.getElementById("natAnswer");

        if (input && input.value !== "") {

            answers[current] =
                parseFloat(input.value);

        }

    }

}


// ==============================
// SAVE & NEXT
// ==============================

function saveNext() {

    saveCurrentAnswer();

    review[current] = false;

    if (current < questions.length - 1) {

        current++;

        loadQuestion();

    }
    else {

        updatePalette();

        alert("This is the last question.");

    }

}


// ==============================
// PREVIOUS
// ==============================

function prevQuestion() {

    saveCurrentAnswer();

    review[current] = false;

    if (current > 0) {

        current--;

        loadQuestion();

    }

}


// ==============================
// CLEAR
// ==============================

function clearResponse() {

    answers[current] = null;

    review[current] = false;

    loadQuestion();

}


// ==============================
// MARK FOR REVIEW
// ==============================

function markReview() {

    saveCurrentAnswer();

    review[current] = true;

    updatePalette();

}


// ==============================
// PALETTE
// ==============================

function updatePalette() {

    let palette =
        document.getElementById("palette");

    palette.innerHTML = "";


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let colorClass = "not-answered";


        if (review[i]) {

            colorClass = "review";

        }

        else if (hasAnswer(i)) {

            colorClass = "answered";

        }


        palette.innerHTML += `

            <button
                class="${colorClass}"
                onclick="jump(${i})">

                ${i + 1}

            </button>

        `;

    }

}


function hasAnswer(index) {

    let answer = answers[index];

    if (answer === null) {
        return false;
    }

    if (Array.isArray(answer)) {

        return answer.length > 0;

    }

    return true;

}


// ==============================
// JUMP
// ==============================

function jump(i) {

    saveCurrentAnswer();

    current = i;

    loadQuestion();

}


// ==============================
// CALCULATE SCORE
// ==============================

function calculateScore() {

    let score = 0;


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let q = questions[i];

        let userAnswer = answers[i];


        if (!hasAnswer(i)) {

            continue;

        }


        // =====================
        // MCQ
        // =====================

        if (q.type === "MCQ") {

            if (userAnswer === q.answer) {

                score += q.marks;

            }
            else {

                score -= 1;

            }

        }


        // =====================
        // MSQ
        // =====================

        else if (q.type === "MSQ") {

            let correct =
                Array.isArray(q.answer)
                ? q.answer
                : [q.answer];

            let user =
                Array.isArray(userAnswer)
                ? userAnswer
                : [userAnswer];


            correct.sort();
            user.sort();


            if (
                JSON.stringify(correct) ===
                JSON.stringify(user)
            ) {

                score += q.marks;

            }

        }


        // =====================
        // NAT
        // =====================

        else if (q.type === "NAT") {

            let correctAnswer =
                parseFloat(q.answer);

            let studentAnswer =
                parseFloat(userAnswer);


            if (
                !isNaN(studentAnswer) &&
                Math.abs(
                    studentAnswer - correctAnswer
                ) < 0.005
            ) {

                score += q.marks;

            }

        }

    }


    return score;

}


// ==============================
// SUBMIT EXAM
// ==============================

function submitExam(autoSubmit = false) {

    if (submitted) {
        return;
    }


    saveCurrentAnswer();


    if (!autoSubmit) {

        let confirmSubmit =
            confirm(
                "Are you sure you want to submit the exam?"
            );

        if (!confirmSubmit) {
            return;
        }

    }


    submitted = true;


    if (timerInterval) {

        clearInterval(timerInterval);

    }


    let name =
        prompt("Enter your name");


    if (!name || name.trim() === "") {

        name = "Student";

    }


    let score =
        calculateScore();


    sendResultToGoogleSheet(
        name,
        score
    );


    alert(
        "Exam submitted successfully!\n\n" +
        "Name: " + name +
        "\nScore: " + score + " / 35"
    );


    document.getElementById("examScreen").innerHTML = `

        <div class="result-screen">

            <h1>Exam Submitted</h1>

            <h2>${name}</h2>

            <div class="final-score">

                ${score} / 35

            </div>

            <p>
                Your response has been recorded.
            </p>

        </div>

    `;

}


// ==============================
// GOOGLE SHEET
// ==============================

function sendResultToGoogleSheet(
    name,
    score
) {

    let url =
        "https://script.google.com/macros/s/AKfycbw_AyF_eyKtsgT-ufYemQjAa6QxhOzzySsmJCY45fxeBZtT2xc0O-ARRlpdv2PQVX7Piw/exec";


    url +=
        "?name=" +
        encodeURIComponent(name);


    url +=
        "&score=" +
        encodeURIComponent(score);


    for (
        let i = 0;
        i < answers.length;
        i++
    ) {

        let answer = answers[i];


        if (Array.isArray(answer)) {

            answer = answer.join(",");

        }


        if (answer === null) {

            answer = "";

        }


        url +=
            "&q" +
            (i + 1) +
            "=" +
            encodeURIComponent(answer);

    }


    fetch(url, {
        method: "GET",
        mode: "no-cors"
    })
    .catch(function(error) {

        console.log(
            "Sheet submission error:",
            error
        );

    });

}


// ==============================
// CALCULATOR
// ==============================

function openCalculator() {

    document.getElementById(
        "calculator"
    ).style.display = "block";

}


function closeCalculator() {

    document.getElementById(
        "calculator"
    ).style.display = "none";

}


function calcInput(value) {

    document.getElementById(
        "calcDisplay"
    ).value += value;

}


function clearCalculator() {

    document.getElementById(
        "calcDisplay"
    ).value = "";

}


function calculate() {

    let display =
        document.getElementById(
            "calcDisplay"
        );

    try {

        display.value =
            eval(display.value);

    }

    catch {

        display.value = "Error";

    }

}
