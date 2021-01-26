'use strict';

const showBtn = document.querySelector('.show-btn');
const form = document.querySelector('.HeroForm');
const closeBtn = document.querySelector('.close-button');

showBtn.addEventListener('click', () => {
	form.classList.toggle('hide');
});

closeBtn.addEventListener('click', () => {
	form.classList.add('hide');
});

