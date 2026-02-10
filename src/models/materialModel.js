const materials = {
    "simple-present": {
        title: "Simple Present Tense",
        definition: "Simple Present Tense adalah bentuk waktu yang digunakan untuk menyatakan fakta, kebenaran umum, kebiasaan (habitual action), atau kejadian yang terjadi saat ini.",
        usage: [
            "Menyatakan rutinitas atau kebiasaan sehari-hari.",
            "Menyatakan kebenaran umum atau fakta ilmiah.",
            "Menyatakan perasaan, pikiran, atau kepemilikan."
        ],
        formula: {
            positive: "S + V1 (s/es) + O",
            negative: "S + do/does + not + V1 + O",
            interrogative: "Do/Does + S + V1 + O?"
        },
        examples: [
            "Positive: She drinks coffee every morning.",
            "Negative: He does not (doesn't) like spicy food.",
            "Interrogative: Do you play football?"
        ]
    },
    "present-continuous": {
        title: "Present Continuous Tense",
        definition: "Present Continuous Tense digunakan untuk membicarakan aksi yang sedang berlangsung sekarang atau rencana di masa depan yang sudah pasti.",
        usage: [
            "Menyatakan kejadian yang sedang terjadi saat bicara (now, right now).",
            "Menyatakan kejadian yang sedang berlangsung sekitar waktu sekarang (this week, this month).",
            "Menyatakan rencana masa depan yang sudah pasti."
        ],
        formula: {
            positive: "S + am/is/are + V-ing + O",
            negative: "S + am/is/are + not + V-ing + O",
            interrogative: "Am/Is/Are + S + V-ing + O?"
        },
        examples: [
            "Positive: I am studying English right now.",
            "Negative: They are not watching TV.",
            "Interrogative: Is she sleeping?"
        ]
    },
    "simple-past": {
        title: "Simple Past Tense",
        definition: "Simple Past Tense digunakan untuk membicarakan kejadian yang sudah selesai terjadi di masa lampau.",
        usage: [
            "Menyatakan kejadian yang terjadi dan selesai di waktu tertentu di masa lalu (yesterday, last week, in 2010).",
            "Menyatakan serangkaian kejadian di masa lalu."
        ],
        formula: {
            positive: "S + V2 + O",
            negative: "S + did + not + V1 + O",
            interrogative: "Did + S + V1 + O?"
        },
        examples: [
            "Positive: We went to Bali last year.",
            "Negative: She did not (didn't) come to the party.",
            "Interrogative: Did you finish your homework?"
        ]
    },
    "past-continuous": {
        title: "Past Continuous Tense",
        definition: "Past Continuous Tense digunakan untuk menyatakan aksi yang sedang berlangsung pada waktu tertentu di masa lampau.",
        usage: [
            "Menyatakan aksi yang sedang terjadi ketika aksi lain terjadi di masa lampau (biasanya menggunakan 'when' atau 'while').",
            "Menyatakan dua aksi yang sedang berlangsung bersamaan di masa lampau."
        ],
        formula: {
            positive: "S + was/were + V-ing + O",
            negative: "S + was/were + not + V-ing + O",
            interrogative: "Was/Were + S + V-ing + O?"
        },
        examples: [
            "Positive: I was reading a book when he called.",
            "Negative: They were not playing football.",
            "Interrogative: Were you sleeping at 9 PM?"
        ]
    }
};

module.exports = materials;