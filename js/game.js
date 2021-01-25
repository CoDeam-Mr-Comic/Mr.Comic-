'use strict';
import { superhero } from './superheroData.js';

let question1 = 'Is the gender of your hero female?';
let mainQuestions = [];

const content = document.querySelector('.content');
const startBtn = document.querySelector('.start-btn');

const result = document.querySelector('.result');
const again = document.querySelector('.again');
const failed = document.querySelector('.failed');
const success = document.querySelector('.success');

startBtn.addEventListener('click', () => {
	startBtn.style.display = 'none';
	content.style.display = 'block';
});

//first question
window.addEventListener('load', (e) => {
	content.innerHTML = `<div class="question-box">
                    <div class="question">
                        <h2>${question1}</h2>
                    </div>
                    <div class="answers">
                        <div class="answer-box">
                            <img src="utilityImg/answer.jpg" alt="">
                            <p class="answer yes">yes</p>
                        </div>
                        <div class="answer-box">
                            <img src="utilityImg/answer.jpg" alt="">
                            <p class="answer no">no</p>
                        </div>
                    </div>
                </div>`;
	const yes = document.querySelector('.yes');
	const no = document.querySelector('.no');

	yes.addEventListener('click', () => {
		const filteredHero = superhero.filter((hero) => {
			return hero.gender === 'female';
		});
		filteredHero.forEach((hero) => {
			mainQuestions.push(hero.question);
		});
		nextQuestion(mainQuestions);
	});

	no.addEventListener('click', () => {
		const filteredHero = superhero.filter((hero) => {
			return hero.gender === 'male';
		});
		filteredHero.forEach((hero) => {
			mainQuestions.push(hero.question);
		});
		nextQuestion(mainQuestions);
	});
});

const nextQuestion = (questions) => {
	const index = randomIndex();
	content.innerHTML = `<div class="question-box">
                    <div class="question">
                        <h2>${questions[index]}</h2>
                    </div>
                    <div class="answers">
                        <div class="answer-box">
                            <img src="utilityImg/answer.jpg" alt="">
                            <p class="answer yes">yes</p>
                        </div>
                        <div class="answer-box">
                            <img src="utilityImg/answer.jpg" alt="">
                            <p class="answer no">no</p>
                        </div>
                    </div>
                </div>`;

	const yes = document.querySelector('.yes');
	const no = document.querySelector('.no');

	yes.addEventListener('click', () => {
		if (questions.length) {
			const answer = questions[index];
			const hero = superhero.find((hero) => {
				return hero.question === answer;
			});
			result.style.display = 'block';
			content.style.visibility = 'hidden';
			again.classList.remove('hide');
			success.classList.remove('hide');
			result.innerHTML = `<img src=${hero.src} alt="">`;
		}
	});

	no.addEventListener('click', () => {
		questions.splice(index, 1);
		if (questions.length) {
			nextQuestion(questions);
		} else {
			result.style.display = 'block';
			content.style.visibility = 'hidden';
			again.classList.remove('hide');
			failed.classList.remove('hide');
			result.innerHTML = `<img src='utilityImg/sorry.jpg' alt="">`;
		}
	});
};

again.addEventListener('click', (e) => {
	location.reload();
});

//utility
function randomIndex() {
	return Math.floor(Math.random() * mainQuestions.length);
}
