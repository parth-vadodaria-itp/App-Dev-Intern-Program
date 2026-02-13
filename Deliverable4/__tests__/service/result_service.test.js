import { calculateResult, decideFinalVerdict, findAnsweredCnt, percentScore } from "../../src/services/resultService.js";

describe("test-cases for logic to calculate total answered questions out of all questions", () => {
    test("when passed null should return 0", () => {
        expect(findAnsweredCnt(null)).toBe(0);
    });
    test("arg:['http','next', null, 'value'] should return 3", () => {
        expect(findAnsweredCnt(new Array("http","next",null,"value"))).toBe(3);
    });
    test("arg:[] should return 0",()=>{
        expect(findAnsweredCnt([])).toBe(0);
    });
});

describe("test-cases for result calculation logic",() => {

    const questions = [
        {
            question: "What does HTML stand for?",
            options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
            ],
            answer: "Hyper Text Markup Language"
        },
        {
            question: "Which HTML tag is used to define a paragraph?",
            options: ["<p>", "<para>", "<paragraph>", "<text>"],
            answer: "<p>"
        },
        {
            question: "Which tag is used to create a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            answer: "<a>"
        },
        {
            question: "Which HTML attribute specifies an alternate text for an image?",
            options: ["title", "alt", "src", "longdesc"],
            answer: "alt"
        }
    ];

    test("question.length!=selectedAnswers.length should return null",() => {
        expect(calculateResult(questions, new Array(null,"html","css"))).toBeNull();
    });
    test("selectedAnswers==null should return null",() => {
        expect(calculateResult(questions, null)).toBeNull();
    });
    test("questions=[] which implies selectedAnswers=[] should return 0",() => {
        expect(calculateResult([], [])).toBe(0);
    });
    test("if selectedAnswers[j]==null",() => {
        expect(calculateResult(new Array(questions[1]), [null])).toBe(0);
    });
    test("if selectedAnswers[j]!=questions[j].answer",() => {
        expect(calculateResult(new Array(questions[1]), ["<para>"])).toBe(0);
    });
    test("Expected answers and Selected answers with some null, correct and wrong answers.",() => {
        expect(calculateResult(questions, [null,"<p>","link","alt"])).toBe(2);
    });
});

// describe("test-cases for logic to calculate percentage scored",()=>{    
//     test("when page is opened directly i.e. test not attempted yet",() => {
//         expect(percentScore(null,20)).toBeNull();
//     });
//     test("10 out of 20 are correct should result into 50%",() => {
//         expect(Number.parseFloat(percentScore(10,20))).toBeCloseTo(50);
//     });
//     test("10 out of 30 are correct should result into 50%",() => {
//         expect(Number.parseFloat(percentScore(10,30))).toBeCloseTo(33.33);
//     });
// });

// describe("test-cases for logic to decide final verdict",() => {
//     test("when page is opened directly i.e. test not attempted yet",() => {
//         expect(decideFinalVerdict(null)).toEqual({txtColor: null, verdict: "Not Attempted Yet"});
//     });
//     test("Scored less than 70%",() => {
//         expect(decideFinalVerdict(50)).toEqual({txtColor: "text-red-600", verdict: "Needs Improvement"});
//     });
//     test("Scored 70%",() => {
//         expect(decideFinalVerdict(70)).toEqual({txtColor: "text-green-700", verdict: "Good"});
//     });
//     test("Scored 85%",() => {
//         expect(decideFinalVerdict(85)).toEqual({txtColor: "text-green-700", verdict: "Excellent"});
//     });
//     test("Scored 100%",() => {
//         expect(decideFinalVerdict(100)).toEqual({txtColor: "text-green-700", verdict: "Excellent"});
//     });
// });