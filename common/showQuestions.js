
// UI render methods

function createQuestionEl({ index, question, options }) {
  const questionEl = document.createElement("li");
  questionEl.className = "question";
  questionEl.innerHTML = `<div>${question}</div>`;
  questionEl.value = index;
  for (const option of options) {
    questionEl.innerHTML += `<label><input type="radio" name="${index}" value="${option.value}"> ${option.label}</label><br>`;
  }
  return questionEl;
}

function createAllQuestionsEl(qSet) {
  return qSet.questions.map(q => {
    return createQuestionEl({ ...q, options: q.options ?? qSet.defaultOptions });
  });
}

function showQuestions(quiz, container) {
  if (!container) {
    container = getQuestionContainer();
  }
  const els = createAllQuestionsEl(quiz);
  container.append(...els);
}

/** @virtual */
function getQuestionContainer() {
  return document.getElementById("questions");
}
