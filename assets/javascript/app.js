
var triviaChoices = {
    question1: {
        question: "The New York Yankees organization began as the Baltimore Orioles in 1901. In 1903 the team moved to New York and took a new name. What was the new name that the team took in 1903?",
        answers: [
            "New York Yankees",
            "New York Blue Sox",
            "New York Highlanders",
            "New York Bridges"],
        correctAnswer: "New York Highlanders",
        picture: "New_York_Highlanders_Baseball_Team,_1903.jpg"
    },
    question2: {
        question: "Of these great Yankee teams, which team had the most wins in a season?",
        answers: ["1927",
            "1998",
            "1961",
            "1978",
        ],
        correctAnswer: "1998",
        picture: "1998.jpg"
    },
    question3: {
        question: "When did the Yankees win their first World Series?",
        answers: ["1903",
            "1913",
            "1923",
            "1933"],
        correctAnswer: "1923",
        picture: "1923.jpg"
    },
    question4: {
        question: "Who was the manager of the Yankees for their first five World Series?",
        answers: ["Miller Huggins",
            "Joe McCarthy",
            "Casey Stengel",
            "Ralph Houk",],
        correctAnswer: "Miller Huggins",
        picture: "miller-huggins.jpg"
    },
    question5: {
        question: "In 2005, Alex Rodriguez became the first solely right-handed Yankee hitter to hit 40 home runs in a season since 1937. Who accomplished the feat in 1937?",
        answers: [
            "Babe Ruth",
            "Mickey Mantle",
            "Joe DiMaggio",
            "Roger Maris"],
        correctAnswer: "Joe DiMaggio",
        picture: "dimaggio.jpg"
    },
    question6: {
        question: "Who did the Yankees lose to in their first playoff series of the '90s?",
        answers: ["Boston Red Sox",
            "Baltimore Orioles",
            "Detroit Tigers",
            "Seattle Mariners"],
        correctAnswer: "Seattle Mariners",
        picture: "mariners.jpg"
    },
    question7: {
        question: "Who did Lou Gehrig replace at first base for the New York Yankees?",
        answers: ["Wally Pipp",
            "Ken Williams",
            "Earle Combs",
            "Bob Meusel"],
        correctAnswer: "Wally Pipp",
        picture: "wally.jpg"
    },
    question8: {
        question: "What manager led the Yankees to the World Series title in 2000?",
        answers: ["Yogi Berra",
            "Don Matingly",
            "Joe Torre",
            "Joe Girardi"],
        correctAnswer: "Joe Torre",
        picture: "torre.jpg"
    },
    question9: {
        question: "How many at-bats did Mickey Mantle have as a Yankee?",
        answers: ["7555",
            "8247",
            "8102",
            "8003"],
        correctAnswer: "8102",
        picture: "mantle.jpg"
    },
    question10: {
        question: "Why was Babe Ruth number 3?",
        answers: [
            "favorite number",
            "manager's suggestion",
            "dad's number",
            "batting order"],
        correctAnswer: "batting order",
        picture: "ruth.jpg"
    },
};

var number = 30;
var intervalId;
var clockRunning = false;
var triviaUsed;
var j = 0;
var correct = 0;
var wrong = 0;
var unanswered = 0;
var objKeys = Object.keys(this.triviaChoices);

function restart() {
    number = 30;
    $("#show-number").html("<h2>Time Remaining: " + number + "</h2>");
    run();
}

randomize();

function randomize() {
    objKeys.sort(function (a, b) { return 0.5 - Math.random() })
}

function renderTrivia() {
    console.log(objKeys[0]);
    this.triviaUsed = objKeys[j];
    if (j === 10) {
        stop();
        alert("game over");
        $("#correctText").html("<h2>Correct answers: " + correct + "</h2>");
        $("#wrongText").html("<h2>Wrong answers: " + wrong + "</h2>");
        $("#unansweredText").html("<h2>Unanswered: " + unanswered + "</h2>");
        
       
        $("#trivia-question").empty();
        $("#show-number").empty();
        $("#trivia-question").append(
            "<h2>Final Score" + " </h2>");
      $("#help").append(
                "<button id= 'start'>Play again?" + " </button>");
                setTimeout(function(){
                j=0;
                correct=0;
                wrong=0;
                unanswered=0;
                randomize();
                $("#start").on("click", run);}, 500);
            
    }
    else {
        document.querySelector("#trivia-question").innerHTML = this.triviaChoices[this.triviaUsed].question;
        $("#correctText").html("<h2>Correct answers: " + correct + "</h2>");
        $("#wrongText").html("<h2>Wrong answers: " + wrong + "</h2>");
        $("#unansweredText").html("<h2>Unanswered: " + unanswered + "</h2>");
        for (var i = 0; i < this.triviaChoices[this.triviaUsed].answers.length; i++) {
            var answerBtn = $("<button>");
            answerBtn.addClass("answer-button");
            answerBtn.attr("data-answer", this.triviaChoices[this.triviaUsed].answers[i]);
            answerBtn.text(this.triviaChoices[this.triviaUsed].answers[i]);
            if ((this.triviaChoices[this.triviaUsed].answers[i]) === (this.triviaChoices[this.triviaUsed].correctAnswer)) {
                answerBtn.attr("data-correct", "true");
            }
            else {
                answerBtn.attr("data-correct", "false");
            }
            $("#buttons").append(answerBtn);
        }

        $(".answer-button").on("click", function () {
            var Answer = $("<div>");
            var rightAnswer = $(this).attr("data-correct");
            Answer.text($(this).attr("data-answer"));
            $("#buttons").empty();
            stop();
            if (rightAnswer === "true") {
                correct++
                $("#trivia-question").append(
                    "<h2>" + $(this).attr("data-answer") +
                    " is right</h2>");
                $("#trivia-question").append(
                    "<img src='assets/images/" + triviaChoices[triviaUsed].picture + "' alt='" +
                    triviaChoices[triviaUsed].correctAnswer +
                    "'>");
                setTimeout(function () { restart(); }, 2000);
                j++;
                
            }
            else {
                wrong++
                $("#trivia-question").append(
                    "<h2>" + $(this).attr("data-answer") +
                    " is wrong</h2>");
                $("#trivia-question").append(
                    "<h2>" + triviaChoices[triviaUsed].correctAnswer +
                    " is right</h2>");
                $("#trivia-question").append(
                    "<img src='assets/images/" + triviaChoices[triviaUsed].picture + "' alt='" +
                    triviaChoices[triviaUsed].correctAnswer +
                    "'>");
                setTimeout(function () { restart(); }, 2000);
                j++;
               
            };
        })
    }
};

$("#start").on("click", run);

function run() {
    if (!clockRunning) {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
        clockRunning = true;
        $("#help").empty();
        decrement();
        renderTrivia();
    }
}

function decrement() {
    number--;
    $("#show-number").html("<h2>Time Remaining: " + number + "</h2>");
    if (number === 0) {
        stop();
        alert("Time Up!");
        $("#buttons").empty();
        $("#trivia-question").append(
            "<h2>Time's up!" + " </h2>");
        $("#trivia-question").append(
            "<h2>" + triviaChoices[triviaUsed].correctAnswer + " is right</h2>");
        $("#trivia-question").append(
            "<img src='assets/images/" + triviaChoices[triviaUsed].picture + "' alt='" +
            triviaChoices[triviaUsed].correctAnswer +
            "'>");
        setTimeout(function () { restart(); }, 2000);
        unanswered++
        j++
    }
}

function stop() {
    clearInterval(intervalId);
    clockRunning = false;
}


