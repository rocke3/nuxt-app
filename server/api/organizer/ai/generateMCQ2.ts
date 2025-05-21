export default defineEventHandler(async (event) => {
  return {
    status: true,
    question: 'Which 80\'s hit features the lyric "I come home in the morning light"?',
    answers: [
      {
        answer: "Billie Jean",
        correct: false,
      },
      {
        answer: "Every Breath You Take",
        correct: false,
      },
      {
        answer: "Girls Just Want to Have Fun",
        correct: true,
      },
      {
        answer: "Sweet Child o' Mine",
        correct: false,
      },
    ],
  };
});
