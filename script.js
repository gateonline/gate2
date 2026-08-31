let current = 0;

let answers =
    new Array(questions.length).fill(null);

let review =
    new Array(questions.length).fill(false);

let examEnded = false;

let timerInterval;

const EXAM_TIME = 60 * 60;


/* =====================================================
   START EXAM
   ===================================================== */

function startExam() {

    clearInterval(timerInterval);

    current = 0;

    answers =
        new Array(questions.length).fill(null);

    review =
        new Array(questions.length).fill(false);

    examEnded = false;

    sessionStorage.setItem(
        "gateExamStartTime",
        Date.now()
    );

    document.getElementById(
        "startScreen"
    ).style.display = "none";

    document.getElementById(
        "examArea"
    ).style.display = "flex";

    document.getElementById(
        "calculatorButton"
    ).disabled = false;

    loadQuestion();

    updatePalette();

    updateTimer();

    timerInterval =
        setInterval(
            updateTimer,
            1000
        );
}


/* =====================================================
   LOAD QUESTION
   ===================================================== */

function loadQuestion() {

    let q = questions[current];

    document.getElementById(
        "questionType"
    ).innerText =
        q.type +
        " — " +
        q.marks +
        " Mark" +
        (q.marks > 1 ? "s" : "");


    /*
     * Display question number,
     * marks and question text.
     */

    let questionHTML =
        "Q" +
        (current + 1) +
        ". [" +
        q.marks +
        (q.marks === 1 ? " Mark" : " Marks") +
        "] " +
        q.question.replace(/\n/g, "<br>");


    /*
     * Display image if the question
     * contains an image property.
     */

    if (q.image) {

        questionHTML +=
            '<br><img src="' +
            q.image +
            '" class="question-image" alt="Question illustration">';

    }


    document.getElementById(
        "question"
    ).innerHTML =
        questionHTML;


    let html = "";


    /* ============================
       NAT
       ============================ */

    if (q.type === "NAT") {

        let previous =
            answers[current];

        html = `

            <div class="nat-answer">

                <label>
                    Enter your answer:
                </label>

                <input
                    type="number"
                    id="natInput"
                    step="0.01"
                    min="0"
                    placeholder="Enter answer"
                    value="${
                        previous !== null
                        ? previous
                        : ""
                    }"
                >

                <p class="nat-note">
                    Enter the answer correct to TWO decimal places.
                </p>

            </div>

        `;

    }


    /* ============================
       MSQ
       ============================ */

    else if (q.type === "MSQ") {

        q.options.forEach(
            function(opt, i) {

                let checked =
                    Array.isArray(
                        answers[current]
                    ) &&
                    answers[current].includes(i);


                html += `

                    <label>

                        <input
                            type="checkbox"
                            name="option"
                            value="${i}"
                            ${checked ? "checked" : ""}
                        >

                        ${opt}

                    </label>

                `;

            }
        );

    }


    /* ============================
       MCQ
       ============================ */

    else {

        q.options.forEach(
            function(opt, i) {

                let checked =
                    answers[current] === i;


                html += `

                    <label>

                        <input
                            type="radio"
                            name="option"
                            value="${i}"
                            ${checked ? "checked" : ""}
                        >

                        ${opt}

                    </label>

                `;

            }
        );

    }


    document.getElementById(
        "options"
    ).innerHTML =
        html;


    updatePalette();

}


/* =====================================================
   SAVE CURRENT ANSWER
   ===================================================== */

function saveCurrentAnswer() {

    let q =
        questions[current];


    /* ============================
       NAT
       ============================ */

    if (q.type === "NAT") {

        let input =
            document.getElementById(
                "natInput"
            );


        if (
            !input ||
            input.value.trim() === ""
        ) {

            answers[current] = null;

            return false;

        }


        answers[current] =
            parseFloat(
                input.value
            );


        return true;

    }


    /* ============================
       MCQ
       ============================ */

    if (q.type === "MCQ") {

        let selected =
            document.querySelector(
                'input[name="option"]:checked'
            );


        if (!selected) {

            answers[current] = null;

            return false;

        }


        answers[current] =
            parseInt(
                selected.value
            );


        return true;

    }


    /* ============================
       MSQ
       ============================ */

    if (q.type === "MSQ") {

        let selected =
            document.querySelectorAll(
                'input[name="option"]:checked'
            );


        let selectedAnswers = [];


        selected.forEach(
            function(item) {

                selectedAnswers.push(
                    parseInt(
                        item.value
                    )
                );

            }
        );


        if (
            selectedAnswers.length === 0
        ) {

            answers[current] = null;

            return false;

        }


        answers[current] =
            selectedAnswers.sort(
                (a, b) => a - b
            );


        return true;

    }


    return false;

}


/* =====================================================
   SAVE & NEXT
   ===================================================== */

function saveNext() {

    let answered =
        saveCurrentAnswer();


    /*
     * Save & Next explicitly removes
     * the review status if the question
     * has an answer.
     */

    if (answered) {

        review[current] = false;

    }


    updatePalette();


    if (
        current <
        questions.length - 1
    ) {

        current++;

        loadQuestion();

    }

}


/* =====================================================
   PREVIOUS
   ===================================================== */

function prevQuestion() {

    saveCurrentAnswer();


    /*
     * Do NOT remove review status.
     *
     * A question marked for review
     * must remain violet when using
     * Previous.
     */

    updatePalette();


    if (current > 0) {

        current--;

        loadQuestion();

    }

}


/* =====================================================
   CLEAR RESPONSE
   ===================================================== */

function clearResponse() {

    answers[current] = null;

    review[current] = false;

    loadQuestion();

}


/* =====================================================
   MARK FOR REVIEW
   ===================================================== */

function markReview() {

    saveCurrentAnswer();

    review[current] = true;

    updatePalette();

}


/* =====================================================
   PALETTE
   ===================================================== */

function updatePalette() {

    let palette =
        document.getElementById(
            "palette"
        );


    palette.innerHTML = "";


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let colorClass =
            "not-answered";


        /*
         * Review has priority.
         * Therefore violet stays violet
         * until Save & Next clears it.
         */

        if (review[i]) {

            colorClass =
                "review";

        }

        else if (
            answers[i] !== null
        ) {

            colorClass =
                "answered";

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


/* =====================================================
   JUMP TO QUESTION
   ===================================================== */

function jump(i) {

    saveCurrentAnswer();


    /*
     * IMPORTANT:
     *
     * Do NOT clear review[i].
     *
     * Clicking a question number must
     * preserve the violet review status.
     */

    current = i;

    loadQuestion();

}


/* =====================================================
   TIMER
   ===================================================== */

function updateTimer() {

    if (examEnded) {

        return;

    }


    let startTime =
        Number(
            sessionStorage.getItem(
                "gateExamStartTime"
            )
        );


    if (!startTime) {

        return;

    }


    let elapsed =
        Math.floor(
            (
                Date.now() -
                startTime
            ) / 1000
        );


    let remaining =
        EXAM_TIME -
        elapsed;


    /*
     * TIME OVER
     */

    if (remaining <= 0) {

        document.getElementById(
            "timer"
        ).innerText =
            "00:00";


        clearInterval(
            timerInterval
        );


        examEnded = true;


        /*
         * Automatically open
         * name/mobile submission.
         */

        openNameModal(true);

        return;

    }


    let minutes =
        Math.floor(
            remaining / 60
        );


    let seconds =
        remaining % 60;


    document.getElementById(
        "timer"
    ).innerText =

        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");


    /*
     * Last 5 minutes warning.
     */

    if (remaining <= 300) {

        document.querySelector(
            ".timer-box"
        ).classList.add(
            "timer-warning"
        );

    }

}


/* =====================================================
   SUBMIT EXAM
   ===================================================== */

function submitExam() {

    saveCurrentAnswer();

    updatePalette();


    document.getElementById(
        "submitModal"
    ).style.display =
        "flex";

}


/* =====================================================
   CLOSE SUBMIT CONFIRMATION
   ===================================================== */

function closeSubmitModal() {

    document.getElementById(
        "submitModal"
    ).style.display =
        "none";

}


/* =====================================================
   CONFIRM SUBMIT
   ===================================================== */

function confirmSubmit() {

    closeSubmitModal();


    /*
     * IMPORTANT:
     *
     * Do NOT set examEnded = true here.
     *
     * The student must be able to press
     * Cancel in the name/mobile window.
     */

    openNameModal(false);

}


/* =====================================================
   NAME + MOBILE MODAL
   ===================================================== */

function openNameModal(autoSubmit) {

    saveCurrentAnswer();

    updatePalette();


    document.getElementById(
        "candidateName"
    ).value = "";


    document.getElementById(
        "candidateMobile"
    ).value = "";


    document.getElementById(
        "nameModal"
    ).style.display =
        "flex";


    setTimeout(
        () => {

            document.getElementById(
                "candidateName"
            ).focus();

        },
        100
    );

}


/* =====================================================
   CLOSE NAME MODAL
   ===================================================== */

function closeNameModal() {

    /*
     * If timer has expired, the exam
     * cannot be resumed.
     */

    if (examEnded) {

        return;

    }


    document.getElementById(
        "nameModal"
    ).style.display =
        "none";

}


/* =====================================================
   SCORE CALCULATION
   ===================================================== */

function calculateScore() {

    let score = 0;


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let q =
            questions[i];


        /* ============================
           NAT
           ============================ */

        if (q.type === "NAT") {

            if (
                answers[i] === null
            ) {

                continue;

            }


            /*
             * NAT tolerance:
             * ±0.01
             */

            if (
                Math.abs(
                    answers[i] -
                    q.answer
                ) <= 0.01
            ) {

                score += q.marks;

            }


            continue;

        }


        /* ============================
           MSQ
           ============================ */

        if (q.type === "MSQ") {

            if (
                !Array.isArray(
                    answers[i]
                )
            ) {

                continue;

            }


            let student =
                answers[i]
                    .slice()
                    .sort(
                        (a, b) => a - b
                    );


            let correct =
                q.correctAnswers
                    .slice()
                    .sort(
                        (a, b) => a - b
                    );


            let isCorrect =
                student.length ===
                correct.length;


            if (isCorrect) {

                for (
                    let j = 0;
                    j < correct.length;
                    j++
                ) {

                    if (
                        student[j] !==
                        correct[j]
                    ) {

                        isCorrect = false;

                        break;

                    }

                }

            }


            /*
             * MSQ:
             *
             * Correct = full marks
             * Wrong = 0
             */

            if (isCorrect) {

                score += q.marks;

            }


            continue;

        }


        /* ============================
           MCQ
           ============================ */

        if (q.type === "MCQ") {

            if (
                answers[i] === null
            ) {

                continue;

            }


            if (
                answers[i] ===
                q.answer
            ) {

                score += q.marks;

            }

            else {

                /*
                 * Negative marking:
                 *
                 * 1-mark MCQ = -1/3
                 * 2-mark MCQ = -2/3
                 */

                score -=
                    q.marks / 3;

            }

        }

    }


    /*
     * Do not allow negative
     * final score.
     */

    if (score < 0) {

        score = 0;

    }


    return Number(
        score.toFixed(2)
    );

}


/* =====================================================
   FINAL SUBMIT
   ===================================================== */

function finalSubmit() {

    let name =
        document.getElementById(
            "candidateName"
        ).value.trim();


    let mobile =
        document.getElementById(
            "candidateMobile"
        ).value.trim();


    /*
     * Validate name.
     */

    if (!name) {

        alert(
            "Please enter your name."
        );

        return;

    }


    /*
     * Validate 10-digit mobile number.
     */

    if (
        !/^[0-9]{10}$/.test(
            mobile
        )
    ) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;

    }


    /*
     * Save current answer before
     * calculating final score.
     */

    saveCurrentAnswer();


    let score =
        calculateScore();


    /*
     * Google Apps Script Web App URL.
     *
     * This sends the response to Sheet2.
     */

    let url =
        "https://script.google.com/macros/s/AKfycbw_AyF_eyKtsgT-ufYemQjAa6QxhOzzySsmJCY45fxeBZtT2xc0O-ARRlpdv2PQVX7Piw/exec";


    /*
     * Candidate name.
     */

    url +=
        "?name=" +
        encodeURIComponent(
            name
        );


    /*
     * Mobile number.
     */

    url +=
        "&mobile=" +
        encodeURIComponent(
            mobile
        );


    /*
     * Send Q1-Q25.
     */

    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let answer = "";


        /*
         * IMPORTANT:
         * Define q for the current question.
         */

        let q =
            questions[i];


        if (
            answers[i] !== null
        ) {


            /* ============================
               NAT
               ============================ */

            if (
                q.type === "NAT"
            ) {

                /*
                 * NAT answers remain
                 * numerical.
                 */

                answer =
                    answers[i];

            }


            /* ============================
               MSQ
               ============================ */

            else if (
                q.type === "MSQ"
            ) {

                /*
                 * Convert:
                 *
                 * 0 -> A
                 * 1 -> B
                 * 2 -> C
                 * 3 -> D
                 */

                if (
                    Array.isArray(
                        answers[i]
                    )
                ) {

                    answer =
                        answers[i]
                            .map(
                                function(index) {

                                    return String.fromCharCode(
                                        65 + index
                                    );

                                }
                            )
                            .join(",");

                }

            }


            /* ============================
               MCQ
               ============================ */

            else if (
                q.type === "MCQ"
            ) {

                /*
                 * Convert:
                 *
                 * 0 -> A
                 * 1 -> B
                 * 2 -> C
                 * 3 -> D
                 */

                answer =
                    String.fromCharCode(
                        65 + answers[i]
                    );

            }

        }


        /*
         * Add question response
         * to Google Apps Script URL.
         */

        url +=
            "&q" +
            (i + 1) +
            "=" +
            encodeURIComponent(
                answer
            );

    }


    /*
     * Add final score.
     */

    url +=
        "&score=" +
        encodeURIComponent(
            score
        );


    /*
     * Send to Google Sheets
     * without leaving the exam page.
     */

    let iframe =
        document.createElement(
            "iframe"
        );


    iframe.style.display =
        "none";


    iframe.src =
        url;


    document.body.appendChild(
        iframe
    );


    /*
     * NOW the exam is officially finished.
     */

    examEnded = true;


    clearInterval(
        timerInterval
    );


    /*
     * Close name/mobile modal.
     */

    document.getElementById(
        "nameModal"
    ).style.display =
        "none";


    /*
     * Display candidate name
     * and mobile number.
     */

    document.getElementById(
        "resultName"
    ).innerText =
        "Candidate: " +
        name +
        " | Mobile: " +
        mobile;


    /*
     * Display score.
     */

    document.getElementById(
        "resultScore"
    ).innerText =
        score +
        " / 35";


    /*
     * Show result modal.
     */

    document.getElementById(
        "resultModal"
    ).style.display =
        "flex";


    /*
     * Remove timer information.
     */

    sessionStorage.removeItem(
        "gateExamStartTime"
    );

}


/* =====================================================
   RESULT
   ===================================================== */

function closeResultAndReload() {

    location.reload();

}


/* =====================================================
   CALCULATOR
   ===================================================== */

function openCalculator() {

    document.getElementById(
        "calculator"
    ).style.display =
        "block";

}


function closeCalculator() {

    document.getElementById(
        "calculator"
    ).style.display =
        "none";

}


function calcInput(value) {

    document.getElementById(
        "calc-display"
    ).value += value;

}


function calcClear() {

    document.getElementById(
        "calc-display"
    ).value = "";

}


function calcBackspace() {

    let display =
        document.getElementById(
            "calc-display"
        );


    display.value =
        display.value.slice(
            0,
            -1
        );

}


function calculateResult() {

    let display =
        document.getElementById(
            "calc-display"
        );


    let expression =
        display.value;


    try {

        /*
         * Convert ^ to **
         */

        expression =
            expression.replace(
                /\^/g,
                "**"
            );


        /*
         * Convert sqrt( to Math.sqrt(
         */

        expression =
            expression.replace(
                /sqrt\(/g,
                "Math.sqrt("
            );


        /*
         * Evaluate calculator expression.
         */

        let result =
            Function(
                "return " +
                expression
            )();


        display.value =
            result;

    }

    catch (error) {

        display.value =
            "Error";

    }

}
