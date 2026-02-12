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
    },
    "descriptive-text": {
        title: "Descriptive Text Quiz",
        questions: [
            { id: 501, text: "What is the social function of descriptive text?", options: ["To amuse the reader", "To describe a particular person, place, or thing", "To tell past events"], correctAnswer: "To describe a particular person, place, or thing" },
            { id: 502, text: "Which tense is mostly used in descriptive text?", options: ["Simple Past Tense", "Simple Present Tense", "Future Tense"], correctAnswer: "Simple Present Tense" },
            { id: 503, text: "The part of the text that introduces the object is called...", options: ["Description", "Identification", "Orientation"], correctAnswer: "Identification" },
            { id: 504, text: "'Borobudur Temple' is an example of...", options: ["Specific Participant", "General Noun", "Action Verb"], correctAnswer: "Specific Participant" },
            { id: 505, text: "Which word is an adjective?", options: ["Temple", "Beautiful", "Visit"], correctAnswer: "Beautiful" },
            { id: 506, text: "In 'Pink Beach is amazing', 'amazing' describes...", options: ["The action", "The subject", "The time"], correctAnswer: "The subject" },
            { id: 507, text: "The description part usually contains...", options: ["The name of the object", "Detailed features", "The writer's opinion"], correctAnswer: "Detailed features" },
            { id: 508, text: "Pink Beach is famous for its...", options: ["Black sand", "Pink sand", "White sand"], correctAnswer: "Pink sand" },
            { id: 509, text: "What makes the sand pink?", options: ["Paint", "Red coral fragments", "Pollution"], correctAnswer: "Red coral fragments" },
            { id: 510, text: "Synonym of 'Magnificent' is...", options: ["Ugly", "Small", "Impressive"], correctAnswer: "Impressive" }
        ]
    },
    "present-perfect": {
        title: "Present Perfect Quiz",
        questions: [
            { id: 601, text: "I ___ finished my homework.", options: ["has", "have", "had"], correctAnswer: "have" },
            { id: 602, text: "She ___ visited Paris twice.", options: ["have", "has", "had"], correctAnswer: "has" },
            { id: 603, text: "___ you ever eaten Sushi?", options: ["Has", "Have", "Did"], correctAnswer: "Have" },
            { id: 604, text: "They have lived here ___ 2010.", options: ["for", "since", "in"], correctAnswer: "since" },
            { id: 605, text: "We have known him ___ five years.", options: ["since", "for", "during"], correctAnswer: "for" },
            { id: 606, text: "He has ___ the car.", options: ["wash", "washed", "washing"], correctAnswer: "washed" },
            { id: 607, text: "I have ___ seen that movie.", options: ["already", "yet", "since"], correctAnswer: "already" },
            { id: 608, text: "She hasn't called me ___.", options: ["already", "just", "yet"], correctAnswer: "yet" },
            { id: 609, text: "Which sentence is correct?", options: ["I has gone.", "She have gone.", "We have gone."], correctAnswer: "We have gone." },
            { id: 610, text: "The past participle (V3) of 'go' is...", options: ["went", "go", "gone"], correctAnswer: "gone" }
        ]
    },
    "application-letter": {
        title: "Application Letter Quiz",
        questions: [
            { id: 701, text: "What is the purpose of an application letter?", options: ["To complain", "To apply for a job", "To invite someone"], correctAnswer: "To apply for a job" },
            { id: 702, text: "Another name for application letter is...", options: ["Cover Letter", "Personal Letter", "Invitation Letter"], correctAnswer: "Cover Letter" },
            { id: 703, text: "Which part contains the greeting?", options: ["Heading", "Salutation", "Body"], correctAnswer: "Salutation" },
            { id: 704, text: "'Sincerely,' is an example of...", options: ["Salutation", "Complimentary Close", "Heading"], correctAnswer: "Complimentary Close" },
            { id: 705, text: "In the opening, you should mention...", options: ["Your salary", "The position applied", "Your hobbies"], correctAnswer: "The position applied" },
            { id: 706, text: "Which expression is formal?", options: ["I want this job.", "I look forward to hearing from you.", "See you soon."], correctAnswer: "I look forward to hearing from you." },
            { id: 707, text: "What should you attach?", options: ["Photo album", "CV / Resume", "Shopping list"], correctAnswer: "CV / Resume" },
            { id: 708, text: "'I am confident that...' expresses...", options: ["Doubt", "Confidence", "Fear"], correctAnswer: "Confidence" },
            { id: 709, text: "Body paragraphs explain...", options: ["The weather", "Qualifications and experience", "Company history"], correctAnswer: "Qualifications and experience" },
            { id: 710, text: "If recipient is unknown, write...", options: ["Dear Sir/Madam", "Hi Bro", "Hello Friend"], correctAnswer: "Dear Sir/Madam" }
        ]
    },
    "recount-text": {
        title: "Recount Text Quiz",
        questions: [
            { id: 801, text: "What is the purpose of Recount Text?", options: ["To entertain", "To retell past events", "To describe a place"], correctAnswer: "To retell past events" },
            { id: 802, text: "Which tense is used in Recount Text?", options: ["Simple Present", "Simple Past", "Future Tense"], correctAnswer: "Simple Past" },
            { id: 803, text: "The first paragraph is called...", options: ["Orientation", "Events", "Reorientation"], correctAnswer: "Orientation" },
            { id: 804, text: "Which word is a temporal conjunction?", options: ["Because", "Then", "But"], correctAnswer: "Then" },
            { id: 805, text: "Reorientation usually contains...", options: ["Introduction", "Events", "Personal comment/closure"], correctAnswer: "Personal comment/closure" },
            { id: 806, text: "A biography is an example of...", options: ["Narrative", "Recount", "Procedure"], correctAnswer: "Recount" },
            { id: 807, text: "'Last holiday' is an example of...", options: ["Action verb", "Time signal", "Adjective"], correctAnswer: "Time signal" },
            { id: 808, text: "I ___ to the zoo yesterday.", options: ["go", "went", "gone"], correctAnswer: "went" },
            { id: 809, text: "Which is NOT a structure of Recount Text?", options: ["Orientation", "Complication", "Events"], correctAnswer: "Complication" },
            { id: 810, text: "We ___ very happy.", options: ["was", "were", "are"], correctAnswer: "were" }
        ]
    },
    "narrative-text": {
        title: "Narrative Text Quiz",
        questions: [
            { id: 901, text: "The main purpose of Narrative Text is to...", options: ["Inform", "Entertain", "Describe"], correctAnswer: "Entertain" },
            { id: 902, text: "Which part contains the problem?", options: ["Orientation", "Complication", "Resolution"], correctAnswer: "Complication" },
            { id: 903, text: "'Once upon a time' is a...", options: ["Time signal", "Verb", "Noun"], correctAnswer: "Time signal" },
            { id: 904, text: "Malin Kundang is a...", options: ["Fable", "Legend", "News"], correctAnswer: "Legend" },
            { id: 905, text: "Resolution is where the problem is...", options: ["Started", "Resolved", "Ignored"], correctAnswer: "Resolved" },
            { id: 906, text: "Narrative text mostly uses...", options: ["Simple Past Tense", "Simple Present Tense", "Future Tense"], correctAnswer: "Simple Past Tense" },
            { id: 907, text: "A story about animals is called...", options: ["Legend", "Fable", "Myth"], correctAnswer: "Fable" },
            { id: 908, text: "Characters are introduced in...", options: ["Orientation", "Complication", "Coda"], correctAnswer: "Orientation" },
            { id: 909, text: "Coda contains...", options: ["The problem", "Moral value", "The events"], correctAnswer: "Moral value" },
            { id: 910, text: "Cinderella is a...", options: ["Fairy Tale", "Fable", "History"], correctAnswer: "Fairy Tale" }
        ]
    },
    "news-item": {
        title: "News Item Quiz",
        questions: [
            { id: 1001, text: "What is the purpose of News Item?", options: ["To entertain", "To inform newsworthy events", "To describe"], correctAnswer: "To inform newsworthy events" },
            { id: 1002, text: "The first paragraph is called...", options: ["Main Event", "Background", "Source"], correctAnswer: "Main Event" },
            { id: 1003, text: "Sources usually contain...", options: ["Writer's opinion", "Comments from witnesses/experts", "Funny stories"], correctAnswer: "Comments from witnesses/experts" },
            { id: 1004, text: "Headlines often use...", options: ["Simple Present Tense", "Past Continuous", "Future Perfect"], correctAnswer: "Simple Present Tense" },
            { id: 1005, text: "Background events explain...", options: ["The summary", "Details (who, where, when)", "The conclusion"], correctAnswer: "Details (who, where, when)" },
            { id: 1006, text: "'Said', 'Reported', 'Stated' are examples of...", options: ["Action verbs", "Saying verbs", "Thinking verbs"], correctAnswer: "Saying verbs" },
            { id: 1007, text: "Is News Item factual?", options: ["Yes", "No", "Maybe"], correctAnswer: "Yes" },
            { id: 1008, text: "Passive voice is ___ used in News Item.", options: ["Rarely", "Never", "Commonly"], correctAnswer: "Commonly" },
            { id: 1009, text: "Which one is a News Item source?", options: ["A fairy tale book", "A newspaper", "A comic"], correctAnswer: "A newspaper" },
            { id: 1010, text: "The text focuses on...", options: ["Personal feelings", "Circumstances", "Newsworthy events"], correctAnswer: "Newsworthy events" }
        ]
    },
    "conditional-sentences": {
        title: "Conditional Sentences Quiz",
        questions: [
            { id: 1101, text: "Type 1 formula is: If + Simple Present, ...", options: ["Simple Past", "Simple Future", "Past Future"], correctAnswer: "Simple Future" },
            { id: 1102, text: "If it rains, I ___ stay at home.", options: ["would", "will", "had"], correctAnswer: "will" },
            { id: 1103, text: "Type 2 expresses...", options: ["Future possibility", "Unreal present situation", "Past regret"], correctAnswer: "Unreal present situation" },
            { id: 1104, text: "If I ___ a bird, I would fly.", options: ["was", "were", "am"], correctAnswer: "were" },
            { id: 1105, text: "Type 3 formula: If + Past Perfect, ...", options: ["Past Future", "Past Future Perfect", "Simple Future"], correctAnswer: "Past Future Perfect" },
            { id: 1106, text: "If I had studied, I ___ passed.", options: ["would have", "will have", "would"], correctAnswer: "would have" },
            { id: 1107, text: "Fact of 'If I were rich' is...", options: ["I am rich", "I am not rich", "I was rich"], correctAnswer: "I am not rich" },
            { id: 1108, text: "'Unless' means...", options: ["If", "If not", "Because"], correctAnswer: "If not" },
            { id: 1109, text: "Zero conditional is for...", options: ["General truth", "Dreams", "Past events"], correctAnswer: "General truth" },
            { id: 1110, text: "If you heat ice, it ___.", options: ["melt", "melts", "melted"], correctAnswer: "melts" }
        ]
    },
    "irregular-verbs": {
        title: "Irregular Verbs Quiz",
        questions: [
            { id: 1201, text: "Simple Past (V2) of 'Go' is...", options: ["Gone", "Went", "Goes"], correctAnswer: "Went" },
            { id: 1202, text: "Past Participle (V3) of 'Eat' is...", options: ["Ate", "Eaten", "Eating"], correctAnswer: "Eaten" },
            { id: 1203, text: "Simple Past (V2) of 'See' is...", options: ["Seen", "Saw", "Seeing"], correctAnswer: "Saw" },
            { id: 1204, text: "Past Participle (V3) of 'Take' is...", options: ["Took", "Taken", "Taking"], correctAnswer: "Taken" },
            { id: 1205, text: "Simple Past (V2) of 'Buy' is...", options: ["Bought", "Buyed", "Buying"], correctAnswer: "Bought" },
            { id: 1206, text: "Past Participle (V3) of 'Speak' is...", options: ["Spoke", "Spoken", "Speaking"], correctAnswer: "Spoken" },
            { id: 1207, text: "Simple Past (V2) of 'Write' is...", options: ["Written", "Wrote", "Writing"], correctAnswer: "Wrote" },
            { id: 1208, text: "Past Participle (V3) of 'Know' is...", options: ["Knew", "Known", "Knowing"], correctAnswer: "Known" },
            { id: 1209, text: "Simple Past (V2) of 'Make' is...", options: ["Maked", "Made", "Making"], correctAnswer: "Made" },
            { id: 1210, text: "Past Participle (V3) of 'Give' is...", options: ["Gave", "Given", "Giving"], correctAnswer: "Given" }
        ]
    },
    "to-be": {
        title: "To Be Quiz",
        questions: [
            { id: 1301, text: "I ___ a student.", options: ["is", "am", "are"], correctAnswer: "am" },
            { id: 1302, text: "She ___ happy today.", options: ["are", "am", "is"], correctAnswer: "is" },
            { id: 1303, text: "They ___ playing football.", options: ["is", "am", "are"], correctAnswer: "are" },
            { id: 1304, text: "We ___ at the park yesterday.", options: ["was", "were", "are"], correctAnswer: "were" },
            { id: 1305, text: "He ___ sick last night.", options: ["were", "was", "is"], correctAnswer: "was" },
            { id: 1306, text: "It ___ a beautiful day.", options: ["am", "are", "is"], correctAnswer: "is" },
            { id: 1307, text: "You ___ my best friend.", options: ["is", "am", "are"], correctAnswer: "are" },
            { id: 1308, text: "I ___ be there tomorrow.", options: ["will", "am", "was"], correctAnswer: "will" },
            { id: 1309, text: "___ she your sister?", options: ["Are", "Am", "Is"], correctAnswer: "Is" },
            { id: 1310, text: "___ they coming to the party?", options: ["Is", "Am", "Are"], correctAnswer: "Are" }
        ]
    }
};

module.exports = quizzes;