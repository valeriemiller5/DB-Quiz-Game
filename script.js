$(document).ready(function () {
    // The questions will be shuffled, so they won't be in the same order each time the quiz is taken
    // Answered questions will be removed from the array, so the variable cannot be const
    let questions = [
        {
            id: 1,
            question: "What is Master Roshi's signature move that he taught Goku as a kid?",
            choices: [
                "The Kamehameha Wave",
                "Cowabunga Dude",
                "Bibidi-bobidi-boo",
                "Go Do Stuff"
            ],
            answer: "The Kamehameha Wave",
            image: "./images/GokufirstKame.png"
        },
        {
            id: 2,
            question: "In the manga series, what color is Bulma's hair?",
            choices: [
                "Purple",
                "Pink",
                "Blue",
                "Black"
            ],
            answer: "Purple",
            image: "./images/bulmaHairColor.jpg"
        },
        {
            id: 3,
            question: "What item is used to restore an injured Z fighter?",
            choices: [
                "Senzu Bean",
                "Healing Potion",
                "Pizza",
                "Cure Spell"
            ],
            answer: "Senzu Bean",
            image: "./images/senzuBeans.png"
        },
        {
            id: 4,
            question: "Who is the Special Guest who appeared in the original Dragon Ball and Dragon Ball Super series?",
            choices: [
                "Arale",
                "Punky Brewster",
                "Batman",
                "Bubbles from the Power Puff Girls"
            ],
            answer: "Arale",
            image: "./images/arale.jpg"
        },
        {
            id: 5,
            question: "What are the names of the cricket and money on King Kai's planet?",
            choices: [
                "Gregory and Bubbles",
                "Frank and Charlie",
                "Simon and Garfunkle",
                "Charlie and George"
            ],
            answer: "Gregory and Bubbles",
            image: "./images/gregoryAndBubbles.jpg"
        },
        {
            id: 6,
            question: "What is Vegeta's special move called?",
            choices: [
                "Special Beam Cannon",
                "Bibidi-bobidi-boo",
                "Galick Gun",
                "Final Countdown"
            ],
            answer: "Galick Gun",
            image: "./images/galickGun.jpeg"
        },
        {
            id: 7,
            question: "Who destroyed Goku and Vegeta's home planet?",
            choices: [
                "Frieza",
                "Majin Buu",
                "Mr. Satan",
                "Cell"
            ],
            answer: "Frieza",
            image: "./images/frieza.jpeg"
        },
        {
            id: 8,
            question: "What happened to Captain Ginyu?",
            choices: [
                "He became a frog",
                "He dies",
                "He walks away into the sunset",
                "Nothing in particular"
            ],
            answer: "He became a frog",
            image: "./images/genyuFrog.jpeg"
        },
        {
            id: 9,
            question: "How does Goku quickly get from one place to another in Dragon Ball Z?",
            choices: [
                "Instant Transmission",
                "Walks to his destination",
                "Flying Nimbus",
                "Teleporter"
            ],
            answer: "Instant Transmission",
            image: "./images/instantTransmission.jpg"
        },
        {
            id: 10,
            question: "Who is Goku married to, and what is her father's name?",
            choices: [
                "Chi Chi, Ox King",
                "Peach, Donkey Kong",
                "Daisy, Bowser",
                "Liza, Vincente"
            ],
            answer: "Chi Chi, Ox King",
            image: "./images/chichiandOxKing.jpg"
        }
    ];

    //Global variable to store the random questions and question ids
    let shuffledQuestions;
    let question;
    let id = 100;
    let score = 0;
    let time = 30;
    let timerStarted = false;
    let timeSet;


    //Fisher-Yates Shuffle algorithm
    const shuffle = a => {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    };

    //This function starts the game by shuffling the questions, rendering the question itself as a paragraph
    // And dynamically creating the answer choices as buttons
    const shuffleQuestions = () => {
        $("#quiz").empty();
        shuffledQuestions = questions[Math.floor(Math.random() * questions.length)];
        // Once all of the questions are answered, id will be undefined.
        // To stop the error from breaking the code, handle it with a try/catch statement
        try {
            id = shuffledQuestions.id;
            // console.log(`id on line 151: ${id}`);
        } catch (error) {
            id = null;
            // stop the timer
            timerStarted = false;
            clearInterval(timeSet);
            // Using Sweetalert2, because it looks nicer than the default alert
            Swal.fire({
                title: 'Check Results',
                text: "You answered all the questions! Click 'Continue' to see your score.",
                type: "success",
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                allowOutsideClick: false,
                confirmButtonText: 'Continue',
                confirmButtonColor: "#4527a0",
                showLoaderOnConfirm: true,
                preConfirm: (name) => {
                    storeScore();
                    let newScore = localStorage.getItem("score");
                    localStorage.setItem(name, newScore);
                    window.location = "high-scores.html";
                },
            })
        }
        // Once all of the questions are answered, question will be undefined.
        // To stop the error from breaking the code, handle it with a try/catch statement
        try {
            let p = $("<p style='font-size: 30px'>");
            question = shuffledQuestions.question
            p.text(question);
            $("#quiz").append(p);
        } catch (error) {
            question = null;
        }

        for (var i = 0; i < questions.length; i++) {
            // console.log(`questions.length: ${questions.length}`);
            if (id === questions[i].id) {
                // console.log(`id in if statement: ${id}`)
                // console.log(`answers[i].id in if statement ${questions[i].id}`);
                let choices = questions[i].choices;
                // console.log(choices);
                shuffle(choices);
                // console.log(choices);
                let ul = $("<ul>");
                for (var j = 0; j < choices.length; j++) {
                    // console.log(choices[j]);
                    let li = $("<li style='margin-bottom: 5px'>");
                    // use the choices array to populate the value of the buttons. Values cannot have spaces, so use Regex to replace spaces with hyphens and convert to all lower-case letters.
                    let btn = $(`<button id="answerBtn" class="btn waves-effect waves-light deep-purple start" value=${choices[j].replace(/ +/g, '-').toLowerCase()}>`);
                    btn.text(choices[j]);
                    li.append(btn);
                    $("#quiz").append(ul);
                    $(ul).append(li);
                };
            }
        };
    };

    // Using the built-in jQuery method grep - itentifies an object in the array (the current question) and removes it
    // so that the same question isn't asked twice
    const removeQuestion = () => {
        var removeItem = id;
        // console.log(`id of removed object: ${removeItem}`)
        questions = $.grep(questions, function (value) {
            return value.id != removeItem;
        });
        if (removeItem === undefined) {
            location.replace("high-scores.html");
        }
    };

    // Display image of correct answer once player has made a selection
    const showAnswer = () => {
        var img = $("<img style='height: 200px'>");
        img.attr("src", shuffledQuestions.image)
        var p = $("<p>")
        p.text(`The answer is: ${shuffledQuestions.answer}`);
        $("#answerImage").append(p).append(img);
    };

    // Countdown timer to give player 1 minute to complete the quiz
    const timer = () => {
        if (!timerStarted) {
            timeSet = setInterval(function () {
                time--;
                $("#timer").html(time);
                if (time === 0) {
                    clearInterval(timeSet);
                    timeSet = 0;
                    // Using Sweetalert2, because it looks nicer than the default alert
                    Swal.fire({
                        title: "Time's Up!",
                        text: "Click 'Continue' to see your score.",
                        type: "warning",
                        input: 'text',
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        allowOutsideClick: false,
                        confirmButtonText: 'Continue',
                        confirmButtonColor: "#4527a0",
                        showLoaderOnConfirm: true,
                        preConfirm: (name) => {
                            storeScore();
                            let newScore = localStorage.getItem("score");
                            localStorage.setItem(name, newScore);
                            window.location = "high-scores.html";
                        },
                    });
                }
            }, 1000);
            timerStarted = true;
        };
    };

    const storeScore = () => {
        let myScore = score.toString();
        localStorage.setItem("score", myScore);
    }

    // Handles the click event for the dynamically created answer choice buttons
    // compares the value of the selected question with the correct answer to the question
    // if the answer is correct, a message will appear and score increases by 1
    // if incorrect, a message will appear and the game will move on to the next question
    $("#quiz").on("click", "#answerBtn", function () {
        let check = $(this).val();
        // console.log(check);
        //Since the button values are hyphenated, use Regex to hyphenate the answer and convert to all lower-case for exact matches.
        let correctAnswer = shuffledQuestions.answer.replace(/ +/g, '-').toLowerCase()
        // console.log(correctAnswer);
        $("#answerImage").empty();
        var h = $("<h5>");
        //Checks if the selected answer is correct
        if (check === correctAnswer) {
            score++;
            h.html("<hr>Correct!");
            $("#answerImage").append(h).append(showAnswer());
        } else {
            time--;
            h.html("<hr>Wrong!");
            $("#answerImage").append(h).append(showAnswer());
        };
        removeQuestion();
        shuffleQuestions();
    });

    //Click event to start the game
    $(".start").on("click", function () {
        timer();
        $("#heading").hide();
        $(".start").hide();
        shuffleQuestions();
    });


    const populateTable = () => {
        //Sort the items in localStorage from highest to lowest score
        const keysSorted = Object.keys(localStorage).sort(function (a, b) { return localStorage[b] - localStorage[a] })
        // console.log(keysSorted);
        let tr;
        let td1;
        let td2;
        let span;
        let namesArray = [];
        let namedScore;

        //Display scores in a table on high-scores.html
        for (var i = 0; i < keysSorted.length; i++) {
            let names = keysSorted[i];
            namesArray.push(names);
            namedScore = localStorage.getItem(names);
            if (names !== "score" && isNaN(names)) {
                tr = $("<tr>");
                td1 = $("<td>");
                td2 = $("<td>");
                span = $(`<span id=${names.replace(/ +/g, '-').toLowerCase()} class=" btn waves-effect waves-light red delete" type="button" style="margin-left: 50px">X</span>`);
                td1.text(names);
                td2.text(namedScore)
                tr.append(td1).append(td2);
                tr.append(span)
                $("#myScores").append(tr);
            }
        };

        // Delete scores from scoreboard
        $("#myScores").on("click", ".delete", function () {
            // console.log(this.id);
            // console.log(namesArray);
            namesArray.forEach(name => {
                if (name.replace(/ +/g, '-').toLowerCase() === this.id) {
                    // console.log("match: " + name);
                    localStorage.removeItem(name);
                    window.location.reload();
                }
            })
        })


    }
    populateTable()

});

