/* =====================================================
   POLYMER GATE - EXAM SCRIPT
   ===================================================== */


/* =====================================================
   EXAM VARIABLES
   ===================================================== */

let current = 0;

let answers =
    new Array(questions.length).fill(null);

let review =
    new Array(questions.length).fill(false);

let examEnded = false;

let timerInterval = null;

let angleMode = "DEG";


/* =====================================================
   EXAM TIME
   ===================================================== */

/*
   TOTAL EXAM TIME = 1 HOUR

   60 × 60 = 3600 seconds
*/

const EXAM_TIME = 60 * 60;


/* =====================================================
   PAGE LOAD
   ===================================================== */

window.addEventListener(
    "load",
    function () {

        const totalQuestions =
            document.getElementById(
                "totalQuestions"
            );

        if (totalQuestions) {

            totalQuestions.innerText =
                questions.length;

        }

        console.log(
            "POLYMER GATE loaded."
        );

    }
);


/* =====================================================
   START EXAM
   ===================================================== */

function startExam() {

    clearInterval(
        timerInterval
    );

    current = 0;

    answers =
        new Array(
            questions.length
        ).fill(null);

    review =
        new Array(
            questions.length
        ).fill(false);

    examEnded = false;


    /*
       Record start time
    */

    let startTime =
        Date.now();

    sessionStorage.setItem(
        "gateExamStartTime",
        startTime
    );


    /*
       Hide start screen
    */

    document.getElementById(
        "startScreen"
    ).style.display =
        "none";


    /*
       Show exam
    */

    document.getElementById(
        "examArea"
    ).style.display =
        "flex";


    /*
       Enable calculator
    */

    const calculatorButton =
        document.getElementById(
            "calculatorButton"
        );

    if (calculatorButton) {

        calculatorButton.disabled =
            false;

    }


    /*
       Load first question
    */

    loadQuestion();


    /*
       Create palette
    */

    updatePalette();


    /*
       Start timer
    */

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

    let q =
        questions[current];


    if (!q) {

        console.error(
            "Question not found:",
            current
        );

        return;

    }


    /*
       Question number
    */

    const currentQuestion =
        document.getElementById(
            "currentQuestion"
        );

    if (currentQuestion) {

        currentQuestion.innerText =
            current + 1;

    }


    /*
       Question
    */

    document.getElementById(
        "question"
    ).innerText =

        "Q" +
        (current + 1) +
        ". " +
        q.question;


    /*
       Determine question type
    */

    let type =
        getQuestionType(q);


    const questionType =
        document.getElementById(
            "questionType"
        );

    if (questionType) {

        questionType.innerText =
            type;

    }


    /*
       Determine marks
    */

    let marks =
        getQuestionMarks(
            q,
            current
        );


    const questionMarks =
        document.getElementById(
            "questionMarks"
        );

    if (questionMarks) {

        questionMarks.innerText =
            marks +
            (
                marks === 1
                    ? " Mark"
                    : " Marks"
            );

    }


    /*
       Load options
    */

    let optionsContainer =
        document.getElementById(
            "options"
        );

    optionsContainer.innerHTML =
        "";


    /*
       NAT QUESTION
    */

    if (
        type === "NAT" ||
        type === "NUMERICAL"
    ) {

        let savedValue =
            answers[current] === null
                ? ""
                : answers[current];


        optionsContainer.innerHTML = `

            <div class="nat-input-container">

                <input
                    id="natAnswer"
                    class="nat-input"
                    type="number"
                    step="any"
                    value="${escapeAttribute(savedValue)}"
                    placeholder="Enter numerical answer"
                    autocomplete="off"
                >

                <div class="nat-instruction">
                    Enter your numerical answer.
                    Answer should be correct to TWO decimal places.
                </div>

            </div>

        `;

        return;

    }


    /*
       MSQ / MCQ
    */

    let multiple =
        type === "MSQ" ||
        type === "MULTIPLE SELECT";


    /*
       Make sure options exist
    */

    if (!Array.isArray(q.options)) {

        console.error(
            "Options missing for question:",
            current + 1
        );

        return;

    }


    q.options.forEach(
        function (opt, i) {

            let checked = false;


            /*
               MSQ
            */

            if (multiple) {

                checked =
                    Array.isArray(
                        answers[current]
                    ) &&
                    answers[current].includes(
                        i
                    );

            }


            /*
               MCQ
            */

            else {

                checked =
                    answers[current] === i;

            }


            let inputType =
                multiple
                    ? "checkbox"
                    : "radio";


            let inputName =
                multiple
                    ? "option[]"
                    : "option";


            let label =
                document.createElement(
                    "label"
                );


            label.innerHTML = `

                <input
                    type="${inputType}"
                    name="${inputName}"
                    value="${i}"
                    ${checked ? "checked" : ""}
                >

                <span>
                    ${opt}
                </span>

            `;


            optionsContainer.appendChild(
                label
            );

        }
    );

}


/* =====================================================
   QUESTION TYPE
   ===================================================== */

function getQuestionType(q) {

    let type =
        q.type ||
        q.questionType ||
        q.kind ||
        "MCQ";


    type =
        String(type)
            .trim()
            .toUpperCase();


    if (
        type === "NUM" ||
        type === "NUMERICAL"
    ) {

        return "NAT";

    }


    return type;

}


/* =====================================================
   QUESTION MARKS
   ===================================================== */

function getQuestionMarks(
    q,
    index
) {

    /*
       If questions.js explicitly contains marks,
       use that value.
    */

    if (
        q.marks !== undefined &&
        q.marks !== null
    ) {

        return Number(
            q.marks
        );

    }


    /*
       New exam structure:

       Q1-Q10  = 1 mark
       Q11     = 2 marks
       Q12-Q16 = 1 mark
       Q17-Q25 = 2 marks
    */

    let number =
        index + 1;


    if (
        number >= 1 &&
        number <= 10
    ) {

        return 1;

    }


    if (
        number === 11
    ) {

        return 2;

    }


    if (
        number >= 12 &&
        number <= 16
    ) {

        return 1;

    }


    if (
        number >= 17 &&
        number <= 25
    ) {

        return 2;

    }


    return 1;

}


/* =====================================================
   SAVE CURRENT ANSWER
   ===================================================== */

function saveCurrentAnswer() {

    let q =
        questions[current];


    let type =
        getQuestionType(q);


    /*
       NAT
    */

    if (
        type === "NAT" ||
        type === "NUMERICAL"
    ) {

        let input =
            document.getElementById(
                "natAnswer"
            );


        if (!input) {

            return false;

        }


        let value =
            input.value.trim();


        if (value === "") {

            answers[current] =
                null;

            return false;

        }


        let number =
            Number(value);


        if (
            !Number.isFinite(
                number
            )
        ) {

            return false;

        }


        answers[current] =
            number;


        return true;

    }


    /*
       MSQ
    */

    if (
        type === "MSQ" ||
        type === "MULTIPLE SELECT"
    ) {

        let selected =
            document.querySelectorAll(
                'input[name="option[]"]:checked'
            );


        let values =
            Array.from(
                selected
            ).map(
                function (el) {

                    return Number(
                        el.value
                    );

                }
            );


        if (
            values.length === 0
        ) {

            answers[current] =
                null;

            return false;

        }


        answers[current] =
            values.sort(
                function (a, b) {

                    return a - b;

                }
            );


        return true;

    }


    /*
       MCQ
    */

    let selected =
        document.querySelector(
            'input[name="option"]:checked'
        );


    if (selected) {

        answers[current] =
            parseInt(
                selected.value
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


    if (answered) {

        review[current] =
            false;

    }


    updatePalette();


    if (
        current <
        questions.length - 1
    ) {

        current++;

        loadQuestion();

    }

    else {

        loadQuestion();

    }

}


/* =====================================================
   PREVIOUS
   ===================================================== */

function prevQuestion() {

    let answered =
        saveCurrentAnswer();


    if (answered) {

        review[current] =
            false;

    }


    updatePalette();


    if (
        current > 0
    ) {

        current--;

        loadQuestion();

    }

}


/* =====================================================
   CLEAR RESPONSE
   ===================================================== */

function clearResponse() {

    answers[current] =
        null;

    review[current] =
        false;


    loadQuestion();

    updatePalette();

}


/* =====================================================
   MARK FOR REVIEW
   ===================================================== */

function markReview() {

    saveCurrentAnswer();

    review[current] =
        true;

    updatePalette();

}


/* =====================================================
   QUESTION PALETTE
   ===================================================== */

function updatePalette() {

    let palette =
        document.getElementById(
            "palette"
        );


    if (!palette) {

        return;

    }


    palette.innerHTML =
        "";


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let colorClass =
            "not-answered";


        /*
           Review takes priority
        */

        if (
            review[i]
        ) {

            colorClass =
                "review";

        }


        /*
           Answered
        */

        else if (
            answers[i] !== null
        ) {

            colorClass =
                "answered";

        }


        palette.innerHTML += `

            <button
                class="${colorClass}"
                onclick="jump(${i})"
            >
                ${i + 1}
            </button>

        `;

    }

}


/* =====================================================
   JUMP TO QUESTION
   ===================================================== */

function jump(i) {

    let answered =
        saveCurrentAnswer();


    if (answered) {

        review[current] =
            false;

    }


    updatePalette();


    current =
        i;


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
       TIME OVER
    */

    if (
        remaining <= 0
    ) {

        document.getElementById(
            "timer"
        ).innerText =
            "00:00";


        clearInterval(
            timerInterval
        );


        examEnded =
            true;


        /*
           Save current answer
        */

        saveCurrentAnswer();


        /*
           Automatically request
           candidate details
        */

        openNameModal(
            true
        );


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

        String(minutes)
            .padStart(
                2,
                "0"
            )

        +

        ":"

        +

        String(seconds)
            .padStart(
                2,
                "0"
            );


    /*
       Last 5 minutes
    */

    let timerBox =
        document.querySelector(
            ".timer-box"
        );


    if (
        timerBox &&
        remaining <= 300
    ) {

        timerBox.classList.add(
            "timer-warning"
        );

    }

}


/* =====================================================
   SUBMIT BUTTON
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
   CLOSE SUBMIT MODAL
   ===================================================== */

function closeSubmitModal() {

    if (examEnded) {

        return;

    }


    document.getElementById(
        "submitModal"
    ).style.display =
        "none";

}


/* =====================================================
   CONFIRM SUBMISSION
   ===================================================== */

function confirmSubmit() {

    closeSubmitModal();


    saveCurrentAnswer();


    examEnded =
        true;


    clearInterval(
        timerInterval
    );


    openNameModal(
        false
    );

}


/* =====================================================
   CANDIDATE DETAILS
   ===================================================== */

function openNameModal(
    autoSubmit
) {

    if (autoSubmit) {

        examEnded =
            true;


        clearInterval(
            timerInterval
        );

    }


    saveCurrentAnswer();

    updatePalette();


    document.getElementById(
        "candidateName"
    ).value =
        "";


    const mobileInput =
        document.getElementById(
            "candidateMobile"
        );

    if (mobileInput) {

        mobileInput.value =
            "";

    }


    document.getElementById(
        "nameModal"
    ).style.display =
        "flex";


    setTimeout(
        function () {

            document.getElementById(
                "candidateName"
            ).focus();

        },
        100
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


    let mobileElement =
        document.getElementById(
            "candidateMobile"
        );


    let mobile =
        mobileElement
            ? mobileElement.value.trim()
            : "";


    /*
       Validate name
    */

    if (
        name === ""
    ) {

        alert(
            "Please enter your name."
        );


        document.getElementById(
            "candidateName"
        ).focus();


        return;

    }


    /*
       Validate mobile
    */

    if (
        !/^[0-9]{10}$/.test(
            mobile
        )
    ) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );


        if (mobileElement) {

            mobileElement.focus();

        }


        return;

    }


    /*
       Save current answer one final time
    */

    saveCurrentAnswer();


    /*
       Calculate score
    */

    let score =
        calculateScore();


    /*
       Google Apps Script URL

       IMPORTANT:
       Replace this with your deployed
       Sheet2 Apps Script Web App URL.
    */

    const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbw_AyF_eyKtsgT-ufYemQjAa6QxhOzzySsmJCY45fxeBZtT2xc0O-ARRlpdv2PQVX7Piw/exec";


    /*
       Build URL
    */

    let url =
        SCRIPT_URL;


    url +=
        "?name=" +
        encodeURIComponent(
            name
        );


    url +=
        "&mobile=" +
        encodeURIComponent(
            mobile
        );


    /*
       Send all answers
    */

    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let answer =
            answers[i];


        if (
            Array.isArray(
                answer
            )
        ) {

            answer =
                answer.join(
                    ","
                );

        }


        if (
            answer === null ||
            answer === undefined
        ) {

            answer =
                "";

        }


        url +=
            "&q" +
            (i + 1) +
            "=" +
            encodeURIComponent(
                answer
            );

    }


    /*
       Score
    */

    url +=
        "&score=" +
        encodeURIComponent(
            score
        );


    /*
       Total marks
    */

    url +=
        "&totalMarks=" +
        encodeURIComponent(
            getTotalMarks()
        );


    /*
       Send silently through iframe
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
       Hide candidate modal
    */

    document.getElementById(
        "nameModal"
    ).style.display =
        "none";


    /*
       Show result
    */

    document.getElementById(
        "resultName"
    ).innerText =
        "Candidate: " +
        name;


    const resultMobile =
        document.getElementById(
            "resultMobile"
        );

    if (resultMobile) {

        resultMobile.innerText =
            "Mobile: " +
            mobile;

    }


    document.getElementById(
        "resultScore"
    ).innerText =
        score +
        " / " +
        getTotalMarks();


    setTimeout(
        function () {

            document.getElementById(
                "resultModal"
            ).style.display =
                "flex";

        },
        800
    );


    sessionStorage.removeItem(
        "gateExamStartTime"
    );

}


/* =====================================================
   SCORE CALCULATION
   ===================================================== */

function calculateScore() {

    let score =
        0;


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let q =
            questions[i];


        let type =
            getQuestionType(q);


        let marks =
            getQuestionMarks(
                q,
                i
            );


        let studentAnswer =
            answers[i];


        /*
           Unanswered
        */

        if (
            studentAnswer === null ||
            studentAnswer === undefined
        ) {

            continue;

        }


        /*
           NAT

           NAT has NO negative marking.
        */

        if (
            type === "NAT" ||
            type === "NUMERICAL"
        ) {

            if (
                checkNAT(
                    q,
                    studentAnswer
                )
            ) {

                score +=
                    marks;

            }


            continue;

        }


        /*
           MSQ

           MSQ has NO negative marking.
        */

        if (
            type === "MSQ" ||
            type === "MULTIPLE SELECT"
        ) {

            if (
                checkMSQ(
                    q,
                    studentAnswer
                )
            ) {

                score +=
                    marks;

            }


            continue;

        }


        /*
           MCQ
        */

        if (
            checkMCQ(
                q,
                studentAnswer
            )
        ) {

            score +=
                marks;

        }

        else {

            /*
               Negative marking for MCQ.

               1-mark MCQ = -1/3
               2-mark MCQ = -2/3

               If questions.js defines
               negativeMarks, use that.
            */

            if (
                q.negativeMarks !== undefined
            ) {

                score -=
                    Number(
                        q.negativeMarks
                    );

            }

            else {

                score -=
                    marks / 3;

            }

        }

    }


    /*
       Prevent negative total
    */

    if (
        score < 0
    ) {

        score =
            0;

    }


    /*
       Round score
    */

    return Number(
        score.toFixed(2)
    );

}


/* =====================================================
   TOTAL MARKS
   ===================================================== */

function getTotalMarks() {

    let total =
        0;


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        total +=
            getQuestionMarks(
                questions[i],
                i
            );

    }


    return total;

}


/* =====================================================
   MCQ CHECK
   ===================================================== */

function checkMCQ(
    q,
    studentAnswer
) {

    let correct =
        q.answer;


    /*
       If answer is stored as
       an option index.
    */

    if (
        Number.isInteger(
            correct
        )
    ) {

        return (
            Number(
                studentAnswer
            ) ===
            Number(
                correct
            )
        );

    }


    /*
       If answer is stored as
       A/B/C/D.
    */

    if (
        typeof correct === "string"
    ) {

        let normalized =
            correct
                .trim()
                .toUpperCase();


        if (
            /^[A-D]$/.test(
                normalized
            )
        ) {

            let correctIndex =
                normalized.charCodeAt(0)
                -
                "A".charCodeAt(0);


            return (
                Number(
                    studentAnswer
                ) ===
                correctIndex
            );

        }

    }


    return (
        String(
            studentAnswer
        ) ===
        String(
            correct
        )
    );

}


/* =====================================================
   MSQ CHECK
   ===================================================== */

function checkMSQ(
    q,
    studentAnswer
) {

    /*
       New questions.js uses
       correctAnswers for MSQ.

       Also support q.answer for
       compatibility with older files.
    */

    let correct =
        q.correctAnswers !== undefined
            ? q.correctAnswers
            : q.answer;


    /*
       Convert correct answer
       to an array.
    */

    if (
        !Array.isArray(
            correct
        )
    ) {

        if (
            typeof correct === "string"
        ) {

            correct =
                correct
                    .split(",")
                    .map(
                        function (x) {

                            return x.trim();

                        }
                    );

        }

        else {

            correct =
                [correct];

        }

    }


    /*
       Convert A/B/C/D answers
       to indices if required.
    */

    correct =
        correct.map(
            function (item) {

                if (
                    typeof item === "string" &&
                    /^[A-D]$/i.test(
                        item.trim()
                    )
                ) {

                    return (
                        item
                            .trim()
                            .toUpperCase()
                            .charCodeAt(0)
                        -
                        "A".charCodeAt(0)
                    );

                }


                return Number(
                    item
                );

            }
        );


    let student =
        Array.isArray(
            studentAnswer
        )
            ? studentAnswer
            : [studentAnswer];


    student =
        student.map(
            Number
        );


    correct.sort(
        function (a, b) {

            return a - b;

        }
    );


    student.sort(
        function (a, b) {

            return a - b;

        }
    );


    return (
        JSON.stringify(
            correct
        ) ===
        JSON.stringify(
            student
        )
    );

}


/* =====================================================
   NAT CHECK
   ===================================================== */

function checkNAT(
    q,
    studentAnswer
) {

    let correct =
        Number(
            q.answer
        );


    let student =
        Number(
            studentAnswer
        );


    if (
        !Number.isFinite(
            correct
        ) ||
        !Number.isFinite(
            student
        )
    ) {

        return false;

    }


    /*
       Use tolerance if supplied.

       Supported fields:

       q.tolerance
       q.tol
    */

    if (
        q.tolerance !== undefined
    ) {

        return (
            Math.abs(
                student -
                correct
            ) <=
            Number(
                q.tolerance
            )
        );

    }


    if (
        q.tol !== undefined
    ) {

        return (
            Math.abs(
                student -
                correct
            ) <=
            Number(
                q.tol
            )
        );

    }


    /*
       No tolerance specified.

       Compare to TWO decimal places.
    */

    return (
        Number(
            student.toFixed(2)
        ) ===
        Number(
            correct.toFixed(2)
        )
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


function calcInput(
    value
) {

    let display =
        document.getElementById(
            "calc-display"
        );


    display.value +=
        value;

}


function calcClear() {

    document.getElementById(
        "calc-display"
    ).value =
        "";

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


/* =====================================================
   CALCULATOR ANGLE MODE
   ===================================================== */

function toggleAngleMode() {

    if (
        angleMode === "DEG"
    ) {

        angleMode =
            "RAD";

    }

    else {

        angleMode =
            "DEG";

    }


    const button =
        document.getElementById(
            "angleModeButton"
        );


    if (button) {

        button.innerText =
            angleMode;

    }

}


/* =====================================================
   CALCULATOR FUNCTIONS
   ===================================================== */

function calcFunction(
    operation
) {

    let display =
        document.getElementById(
            "calc-display"
        );


    let value =
        Number(
            display.value
        );


    if (
        !Number.isFinite(
            value
        )
    ) {

        display.value =
            "Error";

        return;

    }


    let result;


    switch (
        operation
    ) {

        case "sin":

            result =
                Math.sin(
                    toRadians(
                        value
                    )
                );

            break;


        case "cos":

            result =
                Math.cos(
                    toRadians(
                        value
                    )
                );

            break;


        case "tan":

            result =
                Math.tan(
                    toRadians(
                        value
                    )
                );

            break;


        case "asin":

            result =
                fromRadians(
                    Math.asin(
                        value
                    )
                );

            break;


        case "acos":

            result =
                fromRadians(
                    Math.acos(
                        value
                    )
                );

            break;


        case "atan":

            result =
                fromRadians(
                    Math.atan(
                        value
                    )
                );

            break;


        case "log":

            result =
                Math.log10(
                    value
                );

            break;


        case "ln":

            result =
                Math.log(
                    value
                );

            break;


        case "sqrt":

        case "squareRoot":

            result =
                Math.sqrt(
                    value
                );

            break;


        case "inverse":

            result =
                1 / value;

            break;


        case "abs":

            result =
                Math.abs(
                    value
                );

            break;


        case "sign":

            result =
                -value;

            break;


        case "exp":

            result =
                Math.exp(
                    value
                );

            break;


        case "factorial":

            result =
                factorial(
                    value
                );

            break;


        default:

            return;

    }


    if (
        Number.isFinite(
            result
        )
    ) {

        display.value =
            formatCalculatorResult(
                result
            );

    }

    else {

        display.value =
            "Error";

    }

}


/* =====================================================
   CALCULATOR EVALUATION
   ===================================================== */

function calculateResult() {

    let display =
        document.getElementById(
            "calc-display"
        );


    let expression =
        display.value;


    if (
        expression.trim() === ""
    ) {

        return;

    }


    try {

        /*
           Power operator
        */

        expression =
            expression.replace(
                /\^/g,
                "**"
            );


        /*
           Percentage

           50% → (50/100)
        */

        expression =
            expression.replace(
                /(\d+(?:\.\d+)?)%/g,
                "($1/100)"
            );


        /*
           Safe calculator evaluation

           Only mathematical characters,
           Math.PI and Math.E are allowed.
        */

        if (
            !/^[0-9+\-*/().\sA-Za-z_]*$/.test(
                expression
            )
        ) {

            throw new Error(
                "Invalid expression"
            );

        }


        let result =
            Function(
                "Math",
                '"use strict"; return (' +
                expression +
                ");"
            )(
                Math
            );


        if (
            typeof result !== "number" ||
            !Number.isFinite(
                result
            )
        ) {

            throw new Error(
                "Invalid result"
            );

        }


        display.value =
            formatCalculatorResult(
                result
            );

    }

    catch (
        error
    ) {

        display.value =
            "Error";

    }

}


/* =====================================================
   FACTORIAL
   ===================================================== */

function factorial(
    n
) {

    if (
        n < 0 ||
        !Number.isInteger(
            n
        )
    ) {

        return NaN;

    }


    if (
        n > 170
    ) {

        return Infinity;

    }


    let result =
        1;


    for (
        let i = 2;
        i <= n;
        i++
    ) {

        result *=
            i;

    }


    return result;

}


/* =====================================================
   ANGLE CONVERSION
   ===================================================== */

function toRadians(
    value
) {

    if (
        angleMode === "RAD"
    ) {

        return value;

    }


    return (
        value *
        Math.PI /
        180
    );

}


function fromRadians(
    value
) {

    if (
        angleMode === "RAD"
    ) {

        return value;

    }


    return (
        value *
        180 /
        Math.PI
    );

}


/* =====================================================
   CALCULATOR FORMAT
   ===================================================== */

function formatCalculatorResult(
    value
) {

    if (
        Math.abs(value) < 1e-12
    ) {

        value =
            0;

    }


    return Number(
        value.toPrecision(
            12
        )
    ).toString();

}


/* =====================================================
   HTML ESCAPE
   ===================================================== */

function escapeAttribute(
    value
) {

    return String(
        value
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );

}
