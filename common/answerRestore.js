function registerAnswerSaver() {
  window.addEventListener('beforeunload', );
}

const FORM_STORAGE_KEY = 'answers';

class AnswerRestore {
  constructor(formEl) {
    this.form = typeof formEl === 'string' ? document.querySelector(formEl) : formEl;
  }

  saveAnswers() {
    const formData = new FormData(this.form);
    const answers = Object.fromEntries(formData);

    // 轉成 JSON 字串存入 sessionStorage
    sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(answers));
  }

  setupAutoSave() {
    window.addEventListener('beforeunload', () => {
      this.saveAnswers();
    });
  }

  loadSavedAnswers() {
    return JSON.parse(sessionStorage.getItem(FORM_STORAGE_KEY) || 'null');
  }

  restoreSavedAnswers() {
    const answers = this.loadSavedAnswers();
    if (!answers) {
      return;
    }
    // check if loaded
    if (document.readyState === 'complete') {
      this.applyAnswers(answers);
    } else {
      window.addEventListener('load', () => {
        this.applyAnswers(answers);
      });
    }
  }

  applyAnswers(answers) {
    for (let [key, value] of Object.entries(answers)) {
      const input = this.form.elements.namedItem(key);
      if (input) {
        input.value = value;
      }
    }
  }
}

function useAnswerRestore(formEl) {
  const answerRestore = new AnswerRestore(formEl);
  answerRestore.setupAutoSave();
  answerRestore.restoreSavedAnswers();
}
