'use strict';
import { superhero } from './superheroData.js';

let mainQuestions = ['Is the gender of your hero female?'];

const content = document.querySelector('.content');

let x = 1;

//first question
window.addEventListener('load', (e) => {
	content.innerHTML = `<div class="question-box">
                    <div class="question">
                        <h2>${mainQuestions[0]}</h2>
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
	const index = randomIndex(questions.length);
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
			console.log(answer);
		}
	});

	no.addEventListener('click', () => {
		questions.splice(index, 1);
		if (questions.length) {
			nextQuestion(questions);
		} else {
			console.log('sorry');
		}
	});
};

function randomIndex() {
	return Math.floor(Math.random() * mainQuestions.length);
}