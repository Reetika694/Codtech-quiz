// Quiz Questions Array
const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Rembrandt"],
        correct: 2
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correct: 1
    },
     {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correct: 2
    },
    {
        question: "What is the boiling point of water at sea level?",
        options: ["90°C", "95°C", "100°C", "110°C"],
        correct: 2
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Oscar Wilde", "William Shakespeare", "Jane Austen", "George Orwell"],
        correct: 1
    },
    {
        question: "What is the currency of Japan?",
        options: ["Yen", "Won", "Dollar", "Euro"],
        correct: 0
    },
    {
        question: "How many continents are there on Earth?",
        options: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "Which organ is responsible for pumping blood throughout the body?",
        options: ["Lungs", "Liver", "Brain", "Heart"],
        correct: 3
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Osmium", "Oxygen", "Gold", "Iron"],
        correct: 1
    },
    {
        question: "Who was the first person to walk on the moon?",
        options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"],
        correct: 2
    },
    {
        question: "What is the square root of 81?",
        options: ["7", "8", "9", "10"],
        correct: 2
    },
    {
        question: "Which ocean is the largest by surface area?",
        options: ["Atlantic", "Indian", "Southern", "Pacific"],
        correct: 3
    }
];

// Global Variables
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const progressBar = document.getElementById('progress');

// Initialize Quiz
function startQuiz() {
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    totalQuestionsElement.textContent = questions.length;
    showQuestion();
    updateScore();
}

// Display Current Question
function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option elements
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
    
    // Update question number
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    
    // Hide next button
    nextBtn.style.display = 'none';
    selectedOption = null;
}

// Handle Option Selection
function selectOption(index) {
    if (selectedOption !== null) return; // Prevent multiple selections
    
    selectedOption = index;
    const options = optionsContainer.children;
    const correctAnswer = questions[currentQuestionIndex].correct;
    
    // Disable all options
    Array.from(options).forEach(option => {
        option.classList.add('disabled');
    });
    
    // Mark selected option
    if (index === correctAnswer) {
        options[index].classList.add('correct');
        score++;
        updateScore();
    } else {
        options[index].classList.add('incorrect');
        // Show correct answer
        options[correctAnswer].classList.add('correct');
    }
    
    // Show next button
    nextBtn.style.display = 'block';
}

// Update Score Display
function updateScore() {
    scoreElement.textContent = score;
}

// Move to Next Question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Show Final Result
function showResult() {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    
    const finalScoreElement = document.getElementById('final-score');
    const totalScoreElement = document.getElementById('total-score');
    const percentageElement = document.getElementById('percentage');
    const remarkElement = document.getElementById('remark');
    
    finalScoreElement.textContent = score;
    totalScoreElement.textContent = questions.length;
    
    const percentage = Math.round((score / questions.length) * 100);
    percentageElement.textContent = percentage + '%';
    
    // Set color based on performance
    if (percentage >= 80) {
        percentageElement.style.color = '#28a745';
        remarkElement.textContent = 'Excellent! Outstanding performance!';
    } else if (percentage >= 60) {
        percentageElement.style.color = '#ffc107';
        remarkElement.textContent = 'Good job! Keep practicing!';
    } else {
        percentageElement.style.color = '#dc3545';
        remarkElement.textContent = 'Keep trying! You can do better!';
    }
}

// Restart Quiz
function restartQuiz() {
    resultScreen.style.display = 'none';
    startScreen.style.display = 'block';
}