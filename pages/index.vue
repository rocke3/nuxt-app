<script setup lang="ts">
const title = "Add contest";

const contestImages = reactive([
  { base64: "", blob: null as Blob | null, old: "" },
  { base64: "", blob: null as Blob | null, old: "" },
  { base64: "", blob: null as Blob | null, old: "" },
  { base64: "", blob: null as Blob | null, old: "" },
  { base64: "", blob: null as Blob | null, old: "" },
]);
const photos = reactive({ base64: [], blob: [], old: [] });
const coupons = ref([]);
const numbOfQues = ref(1);
const project = reactive({
  status: "queue",
  name: "",
  type: "",
  photos: [],
  category: "contest",
  distribution: "",
  sponsors: [],
  coupons: [],
  contests: [
    {
      id: 0,
      question: "",
      image: "",
      answers: [
        { id: 0, answer: "", correct: false, photo: "" },
        { id: 0, answer: "", correct: false, photo: "" },
        { id: 0, answer: "", correct: false, photo: "" },
        { id: 0, answer: "", correct: false, photo: "" },
      ],
    },
  ],
});

const btnDisabled = computed(() =>
  project.name && project.type ? false : true
);

const reviewModal = ref(false);
const projectAdded = ref(false);
const errors = ref([]);

const showReview = async () => {
  reviewModal.value = true;
};

const loading = ref(false);

const addCover = reactive({
  show: false,
  url: "",
  song: "",
  artist: "",
  question: 0,
  answer: 0,
});

const generateMCQ = async () => {
  const key = 0;
  aiModal.error = "";
  const topic = aiModal.topic;
  if (!topic) {
    return;
  }
  aiModal.loading = true;
  const response = await fetch("/api/organizer/ai/generateMCQ2", {
    method: "POST",
    body: JSON.stringify({ topic, type: project.type }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (data.status) {
    project.contests[key].question = data.question;
    data.answers.forEach((answer: string, index: number) => {
      project.contests[key].answers[index].answer = answer.answer;
      project.contests[key].answers[index].correct = answer.correct;
    });
    await fetchImagesForAnswers(key);
    aiModal.show = false;
  } else {
    aiModal.error = data.message;
  }
  aiModal.loading = false;
};

const fetchImageForAnswer = async (answer: string) => {
  const res = await fetch("/api/fetchImages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer }),
  });
  const data = await res.json();
  return data.imageUrl;
};

const fetchImagesForAnswers = async (questionIndex = 0) => {
  const answers = project.contests[questionIndex].answers;

  const imagePromises = answers.map((a) => fetchImageForAnswer(a.answer));
  const images = await Promise.all(imagePromises);

  images.forEach((img, i) => {
    project.contests[questionIndex].answers[i].photo = img;
  });
};

const aiModal = reactive({
  loading: false,
  topic: "Song",
  question: 0,
  error: "",
});
</script>

<template>
  <div>
    <form @submit.prevent="generateMCQ">
      <button
        type="submit"
        style="
          margin-top: 2rem;
          padding: 1rem 2rem;
          border-radius: 5px;
          background-color: #4caf50;
          color: white;
          border: none;
          cursor: pointer;
        "
      >
        Submit
      </button>
    </form>
    <div v-if="project.contests[0].answers[0].photo">
      <h3>Answer Images:</h3>
      <div
        v-for="(answer, idx) in project.contests[0].answers"
        :key="idx"
        style="margin-bottom: 1rem"
      >
        <div>{{ answer.answer }}</div>
        <img
          v-if="answer.photo"
          :src="answer.photo"
          alt="Answer Image"
          style="max-width: 200px"
        />
      </div>
    </div>
    <pre>{{ project }}</pre>
  </div>
</template>
