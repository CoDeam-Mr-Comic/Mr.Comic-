'use strict';

import { superhero } from './superheroData.js';

//local storage
if (!localStorage.getItem('superhero')) {
	localStorage.setItem('superhero', JSON.stringify(superhero));
}
const favorite = JSON.parse(localStorage.getItem('superhero')) || [];

const navbar = document.querySelector('.nav-white');
const linkItemsAchor = document.querySelectorAll('.link-item a');
const footer = document.querySelector('footer');
const footerLinks = document.querySelectorAll('.footer-link a');
const copy = document.querySelector('footer h2');

const content = document.querySelector('.content');
const close = document.querySelector('.close');
const left = document.querySelector('.left');
const right = document.querySelector('.right');

window.addEventListener('DOMContentLoaded', () => {
	const choosenhero = superhero.find((hero) => {
		return hero.id === Number(localStorage.getItem('value'));
	});

	navbar.style.backgroundColor = choosenhero.color[0];
	linkItemsAchor.forEach((linkItem) => {
		linkItem.style.color = choosenhero.color[1];
	});

	footer.style.backgroundColor = choosenhero.color[0];
	footerLinks.forEach((footerLink) => {
		footerLink.style.color = choosenhero.color[1];
	});
	copy.style.color = choosenhero.color[2];

	content.innerHTML = `<div class="img-container">
                            <img src=${choosenhero.src} alt=${choosenhero.name}>
                        </div>
                        <div class="info-container">
                            <h2>${choosenhero.name}</h2>
                            <p>${choosenhero.bio} ${choosenhero.power}</p>
                            <button class='vote-btn' data-id=${choosenhero.id}>Vote</button>
                            <button class='remove-vote-btn hide' data-id=${choosenhero.id}>Remove Vote</button>
						</div>
						<div class='gallary'>
							<img class='gallary-img' src=${choosenhero.pics[0]} alt=${choosenhero.name} data-id='1'>
							<img class='gallary-img' src=${choosenhero.pics[1]} alt=${choosenhero.name} data-id='2'>
							<img class='gallary-img' src=${choosenhero.pics[2]} alt=${choosenhero.name} data-id='3'>
							<img class='gallary-img' src=${choosenhero.pics[3]} alt=${choosenhero.name} data-id='4'>
						</div>
						`;

	const voteBtn = document.querySelector('.vote-btn');
	const removeVoteBtn = document.querySelector('.remove-vote-btn');
	const modal = document.querySelector('.modal');
	const gallaryImgs = document.querySelectorAll('.gallary-img');

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

	gallaryImgs.forEach((gallaryImg) => {
		gallaryImg.addEventListener('click', (e) => {
			e.preventDefault();
			modal.classList.remove('hide');
			close.classList.remove('hide');
			left.classList.remove('hide');
			right.classList.remove('hide');
			let index = e.currentTarget.dataset.id - 1;
			content.style.opacity = 0.4;
			modal.innerHTML = `<img class='modal-img' src=${choosenhero.pics[index]} alt=${choosenhero.name}>`;
			left.addEventListener('click', (e) => {
				e.preventDefault();
				index--;
				if (index < 0) {
					index = 3;
				}
				modal.innerHTML = `<img class='modal-img' src=${choosenhero.pics[index]} alt=${choosenhero.name}>`;
			});

			right.addEventListener('click', (e) => {
				e.preventDefault();
				index++;
				if (index > 3) {
					index = 0;
				}
				modal.innerHTML = `<img class='modal-img' src=${choosenhero.pics[index]} alt=${choosenhero.name}>`;
			});
		});
	});

	close.addEventListener('click', (e) => {
		e.preventDefault();
		modal.classList.add('hide');
		close.classList.add('hide');
		left.classList.add('hide');
		right.classList.add('hide');
		content.style.opacity = 1;
	});
});
