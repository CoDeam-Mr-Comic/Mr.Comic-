'use strict';
import { superhero } from './superheroData.js';

let question1 = 'Is the gender of your hero female?';
let mainQuestions = [];

const content = document.querySelector('.content');
const result = document.querySelector('.result');
const again = document.querySelector('.again');
const failed = document.querySelector('.failed');
const success = document.querySelector('.success');

let x = 1;

//first question
window.addEventListener('load', (e) => {
	content.innerHTML = `<div class="question-box">
                    <div class="question">
                        <h2>${question1}</h2>
                    </div>
                    <div class="answers">
                        <div class="answer-box">
                            <img src="img/Batgirl.jpg" alt="">
                            <p class="answer yes">yes</p>
                        </div>
                        <div class="answer-box">
                            <img src="img/Batgirl.jpg" alt="">
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
			mainQuestions.push(hero.power);
		});
		nextQuestion(mainQuestions);
	});

	no.addEventListener('click', () => {
		const filteredHero = superhero.filter((hero) => {
			return hero.gender === 'male';
		});
		filteredHero.forEach((hero) => {
			mainQuestions.push(hero.power);
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
                            <img src=${superhero[x].src} alt="">
                            <p class="answer yes">yes</p>
                        </div>
                        <div class="answer-box">
                            <img src=${superhero[x].src} alt="">
                            <p class="answer no">no</p>
                        </div>
                    </div>
                </div>`;

	const yes = document.querySelector('.yes');
	const no = document.querySelector('.no');

	x++;

	yes.addEventListener('click', () => {
		if (questions.length) {
			const answer = questions[index];
			const hero = superhero.find((hero) => {
				return hero.power === answer;
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
			result.innerHTML = `<img src='img/sorry.jpg' alt="">`;
		}
	});
};

again.addEventListener('click', (e) => {
	location.reload();
});

//utitlty
function randomIndex() {
	return Math.floor(Math.random() * mainQuestions.length);
}

setInterval(() => {
	again.style.opacity = 1;
}, 10000);
