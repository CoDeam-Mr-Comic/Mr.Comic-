'use strict';

import { superhero } from './superheroData.js';

//local storage
if (!localStorage.getItem('superhero')) {
	localStorage.setItem('superhero', JSON.stringify(superhero));
}
const favorite = JSON.parse(localStorage.getItem('superhero')) || [];

const content = document.querySelector('.content');

window.addEventListener('DOMContentLoaded', () => {
	const choosenhero = superhero.find((hero) => {
		return hero.id === Number(localStorage.getItem('value'));
	});
	content.innerHTML = `<div class="img-container">
                            <img src=${choosenhero.src} alt=${choosenhero.name}>
                        </div>
                        <div class="info-container">
                            <h2>${choosenhero.name}</h2>
                            <p>${choosenhero.bio} ${choosenhero.power}</p>
                            <button class='vote-btn' data-id=${choosenhero.id}>Vote</button>
                            <button class='remove-vote-btn hide' data-id=${choosenhero.id}>Remove Vote</button>
                        </div>`;

	const voteBtn = document.querySelector('.vote-btn');
	const removeVoteBtn = document.querySelector('.remove-vote-btn');

	voteBtn.addEventListener('click', (e) => {
		e.preventDefault();
		voteBtn.classList.add('hide');
		removeVoteBtn.classList.remove('hide');
		const targetHero = favorite.find((hero) => {
			return hero.id === choosenhero.id;
		});
		const modifiedHero = { ...targetHero };
		modifiedHero.vote++;
		favorite.splice(favorite.indexOf(targetHero), 1, modifiedHero);
		localStorage.setItem('superhero', JSON.stringify(favorite));
	});

	removeVoteBtn.addEventListener('click', (e) => {
		e.preventDefault();
		voteBtn.classList.remove('hide');
		removeVoteBtn.classList.add('hide');
		const targetHero = favorite.find((hero) => {
			return hero.id === choosenhero.id;
		});
		const modifiedHero = { ...targetHero };
		modifiedHero.vote--;
		favorite.splice(favorite.indexOf(targetHero), 1, modifiedHero);
		localStorage.setItem('superhero', JSON.stringify(favorite));
	});
});
