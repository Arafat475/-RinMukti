var currentQuestion = 0;
var totalScore = 0;

var questions = [
  {
    question: "এটা কি জরুরি প্রয়োজন নাকি সুবিধার জন্য?",
    english: "Is this an emergency or a convenience?",
    answers: [
      { text: "পরিবারের জরুরি চিকিৎসার জন্য অর্থ দরকার", score: 0 },
      { text: "গুরুত্বপূর্ণ কিন্তু এখনই জরুরি না", score: 1 },
      { text: "বিয়ে বা মোবাইল ফোনের জন্য", score: 2 },
      { text: "ঘর সাজানো বা অপ্রয়োজনীয় কাজের জন্য", score: 2 }
    ]
  }
  ,{
    question: "আপনার কি কোনো বিকল্প আছে?",
    english: "Do you have any alternative options?",
    answers: [
      { text: "পরিবার থেকে বিনা সুদে ধার নিতে পারি", score: 0 },
      { text: "কোনো বিকল্প খুঁজে দেখিনি", score: 1 },
      { text: "ঋণ নেওয়াই সহজ মনে হচ্ছে", score: 2 },
      { text: "অপেক্ষা করে সঞ্চয় করতে চাই না", score: 2 }
    ]
  },
  {
    question: "আয় কমে গেলে কিস্তি দিতে পারবেন?",
    english: "Can you afford payments if income drops?",
    answers: [
      { text: "হ্যাঁ, কয়েক মাসের সঞ্চয় আছে", score: 0 },
      { text: "খাবার খরচ কমাতে হবে", score: 1 },
      { text: "আরেকটি ঋণ নিতে হবে", score: 2 },
      { text: "পুরোটাই বর্তমান আয়ের উপর নির্ভরশীল", score: 2 }
    ]
  },
  {
    question: "এটা আপনার দীর্ঘমেয়াদী লক্ষ্যে কেমন প্রভাব ফেলবে?",
    english: "How will this affect your long-term goals?",
    answers: [
      { text: "সন্তানের পড়াশোনা বা সঞ্চয় বিলম্বিত হতে পারে", score: 1 },
      { text: "ভবিষ্যতের প্রভাব নিয়ে ভাবিনি", score: 1 },
      { text: "শুধু আজকের সমস্যা সমাধান করতে চাই", score: 2 },
      { text: "ভবিষ্যতের সমস্যা পরে সামলানো যাবে", score: 2 }
    ]
  },
  {
    question: "আপনি জামানত হিসেবে কী রাখছেন?",
    english: "What collateral are you risking?",
    answers: [
      { text: "পরিবারের জমি বা বাড়ি", score: 2 },
      { text: "মোটরসাইকেল", score: 1 },
      { text: "ছোট গৃহস্থালি সামগ্রী", score: 0 },
      { text: "জামানত কী দিচ্ছি জানি না", score: 1 }
    ]
  },
  {
    question: "আপনার বাজেট কি এই কিস্তি বহন করতে পারবে?",
    english: "Can your budget absorb these payments?",
    answers: [
      { text: "হ্যাঁ, কিস্তির পরেও সব খরচ চলবে", score: 0 },
      { text: "সংসারের খরচ কমাতে হবে", score: 1 },
      { text: "কিছু কিস্তি মিস হতে পারে", score: 2 },
      { text: "কখনো মাসিক বাজেট তৈরি করিনি", score: 2 }
    ]
  }
];

function showQuestion() {
  var q = questions[currentQuestion];

  document.getElementById("quiz-box").innerHTML = 
    "<div class='quiz-card'>" +
      "<div class='quiz-progress'>" +
  "<div class='progress-top'>" +
    "<span>প্রশ্ন " + (currentQuestion + 1) + " / " + questions.length + "</span>" +
    "<span>" + Math.round(((currentQuestion) / questions.length) * 100) + "% সম্পন্ন</span>" +
  "</div>" +
  "<div class='progress-bar-bg'>" +
    "<div class='progress-bar-fill' style='width:" + ((currentQuestion / questions.length) * 100) + "%'></div>" +
  "</div>" +
"</div>" +
      "<h2 class='quiz-question'>" + q.question + "</h2>" +
      "<p class='quiz-english'>" + q.english + "</p>" +
      "<div class='quiz-answers' id='answers'></div>" +
    "</div>";

  var answersDiv = document.getElementById("answers");
  for (var i = 0; i < q.answers.length; i++) {
    answersDiv.innerHTML += 
      "<button class='quiz-answer' onclick='selectAnswer(" + q.answers[i].score + ")'>" +
        q.answers[i].text +
      "</button>";
  }
}

showQuestion();

function selectAnswer(score) {
  totalScore = totalScore + score;
  currentQuestion = currentQuestion + 1;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  var verdict, verdictEn, color;

  if (totalScore <= 3) {
    verdict = "🟢 আপনার সম্ভবত এই ঋণ দরকার নেই";
    verdictEn = "You probably don't need this loan";
    color = "#1A6B3C";
  } else if (totalScore <= 7) {
    verdict = "🟡 ঋণ নেওয়ার আগে ভালো করে ভাবুন";
    verdictEn = "Think very carefully before borrowing";
    color = "#B45309";
  } else {
    verdict = "🔴 এই ঋণ আপনার পরিবারের জন্য বিপজ্জনক হতে পারে";
    verdictEn = "This loan could seriously harm your family";
    color = "#C53030";
  }

  document.getElementById("quiz-box").innerHTML = 
    "<div class='quiz-card'>" +
      "<div class='result-icon'>" + (totalScore <= 3 ? "✅" : totalScore <= 7 ? "⚠️" : "🚨") + "</div>" +
      "<div class='result-verdict' style='color:" + color + "'>" + verdict + "</div>" +
      "<p class='result-verdict-en'>" + verdictEn + "</p>" +
      "<div class='result-score-bar'>" +
        "<div class='result-score-fill' style='width:" + ((totalScore / 12) * 100) + "%;background-color:" + color + "'></div>" +
      "</div>" +
      "<p class='result-score'>আপনার স্কোর: " + totalScore + " / 12</p>" +
      "<button class='quiz-answer' onclick='restartQuiz()'>🔄 আবার চেষ্টা করুন — Try again</button>" +
      "<a href='calculator.html' class='btn-primary' style='display:block;text-align:center;margin-top:10px;padding:14px;border-radius:8px;text-decoration:none;'>ক্যালকুলেটর ব্যবহার করুন →</a>" +
    "</div>";
}

function restartQuiz() {
  currentQuestion = 0;
  totalScore = 0;
  showQuestion();
}