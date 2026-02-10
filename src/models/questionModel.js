// Simulasi database soal yang dikelompokkan berdasarkan topik
const quizzes = {
    "simple-present": {
        title: "Simple Present Tense",
        questions: [
            { id: 101, text: "She ___ English very well.", options: ["speak", "speaks", "speaking"], correctAnswer: "speaks" },
            { id: 102, text: "They ___ to the park every Sunday.", options: ["go", "goes", "going"], correctAnswer: "go" },
            { id: 103, text: "The sun ___ in the east.", options: ["rise", "rises", "rising"], correctAnswer: "rises" },
            { id: 104, text: "I ___ coffee every morning.", options: ["drink", "drinks", "drinking"], correctAnswer: "drink" },
            { id: 105, text: "He ___ not like spicy food.", options: ["do", "does", "doing"], correctAnswer: "does" },
            { id: 106, text: "___ you play the guitar?", options: ["Do", "Does", "Are"], correctAnswer: "Do" },
            { id: 107, text: "Water ___ at 100 degrees Celsius.", options: ["boil", "boils", "boiling"], correctAnswer: "boils" },
            { id: 108, text: "My father ___ in a bank.", options: ["work", "works", "working"], correctAnswer: "works" },
            { id: 109, text: "We ___ usually wake up late.", options: ["do not", "does not", "are not"], correctAnswer: "do not" },
            { id: 110, text: "The train ___ at 9 PM.", options: ["leave", "leaves", "leaving"], correctAnswer: "leaves" }
        ]
    },
    "present-continuous": {
        title: "Present Continuous Tense",
        questions: [
            { id: 201, text: "Look! The baby ___.", options: ["is sleeping", "sleeps", "are sleeping"], correctAnswer: "is sleeping" },
            { id: 202, text: "I ___ for my keys. Have you seen them?", options: ["look", "am looking", "looks"], correctAnswer: "am looking" },
            { id: 203, text: "What ___ you ___ right now?", options: ["are, doing", "is, doing", "do, do"], correctAnswer: "are, doing" },
            { id: 204, text: "She ___ a book at the moment.", options: ["read", "is reading", "reads"], correctAnswer: "is reading" },
            { id: 205, text: "They ___ not ___ TV.", options: ["are, watching", "is, watching", "do, watch"], correctAnswer: "are, watching" },
            { id: 206, text: "___ it ___ outside?", options: ["Is, raining", "Does, rain", "Do, rain"], correctAnswer: "Is, raining" },
            { id: 207, text: "We ___ dinner now.", options: ["have", "are having", "had"], correctAnswer: "are having" },
            { id: 208, text: "Listen! Someone ___ the piano.", options: ["play", "plays", "is playing"], correctAnswer: "is playing" },
            { id: 209, text: "I ___ to the music.", options: ["listen", "am listening", "listens"], correctAnswer: "am listening" },
            { id: 210, text: "He ___ a blue shirt today.", options: ["wear", "wears", "is wearing"], correctAnswer: "is wearing" }
        ]
    },
    "simple-past": {
        title: "Simple Past Tense",
        questions: [
            { id: 301, text: "We ___ a great movie last night.", options: ["watch", "watched", "were watching"], correctAnswer: "watched" },
            { id: 302, text: "He ___ to Paris three years ago.", options: ["travel", "travels", "traveled"], correctAnswer: "traveled" },
            { id: 303, text: "___ you ___ your homework?", options: ["Did, finish", "Do, finish", "Have, finished"], correctAnswer: "Did, finish" },
            { id: 304, text: "I ___ my phone yesterday.", options: ["lose", "lost", "losing"], correctAnswer: "lost" },
            { id: 305, text: "She ___ happy to see us.", options: ["is", "were", "was"], correctAnswer: "was" },
            { id: 306, text: "They ___ not ___ to the party.", options: ["did, come", "do, come", "did, came"], correctAnswer: "did, come" },
            { id: 307, text: "We ___ pizza for lunch.", options: ["eat", "ate", "eaten"], correctAnswer: "ate" },
            { id: 308, text: "He ___ a letter to his friend.", options: ["write", "wrote", "written"], correctAnswer: "wrote" },
            { id: 309, text: "I ___ him at the mall last week.", options: ["see", "saw", "seen"], correctAnswer: "saw" },
            { id: 310, text: "Where ___ you ___ your holiday?", options: ["did, spend", "do, spend", "did, spent"], correctAnswer: "did, spend" }
        ]
    },
    "past-continuous": {
        title: "Past Continuous Tense",
        questions: [
            { id: 401, text: "I was watching TV when she ___.", options: ["called", "was calling", "calls"], correctAnswer: "called" },
            { id: 402, text: "What were you doing at 8 PM yesterday? I ___ dinner.", options: ["was having", "had", "have"], correctAnswer: "was having" },
            { id: 403, text: "They ___ football while it was raining.", options: ["played", "were playing", "play"], correctAnswer: "were playing" },
            { id: 404, text: "She ___ when I arrived.", options: ["sleeps", "slept", "was sleeping"], correctAnswer: "was sleeping" },
            { id: 405, text: "We ___ not ___ attention.", options: ["were, paying", "was, paying", "did, pay"], correctAnswer: "were, paying" },
            { id: 406, text: "___ he ___ when you saw him?", options: ["Was, working", "Did, work", "Is, working"], correctAnswer: "Was, working" },
            { id: 407, text: "The sun ___ when we woke up.", options: ["shone", "was shining", "is shining"], correctAnswer: "was shining" },
            { id: 408, text: "I ___ a bath when the phone rang.", options: ["took", "was taking", "am taking"], correctAnswer: "was taking" },
            { id: 409, text: "They ___ about the movie.", options: ["talked", "were talking", "are talking"], correctAnswer: "were talking" },
            { id: 410, text: "It ___ heavily all night.", options: ["rained", "was raining", "is raining"], correctAnswer: "was raining" }
        ]
    }
};

module.exports = quizzes;