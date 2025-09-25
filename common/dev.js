function formDeserialize(form, data) {
  if (typeof data === 'string' && data[0] === '{') {
    data = JSON.parse(data);
  } else if (data instanceof FormData || typeof data === 'string') {
    data = Object.fromEntries(data);
  }
  for (const [key, val] of Object.entries(data)) {
    const input = form.elements.namedItem(key);
    if (input.type === 'checkbox') {
      input.checked = !!val;
    } else {
      input.value = val;
    }
  }
}

/** @virtual */
function autofill() {
  const randomChoice = (options) => options[Math.floor(Math.random() * options.length)];
  formDeserialize(document.getElementById("quizForm"), Object.fromEntries(quiz.questions.map((q) => [q.index, randomChoice(q.options ?? quiz.defaultOptions).value])));
}
