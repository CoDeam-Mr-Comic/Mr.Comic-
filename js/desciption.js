'use strict';

import { superhero } from './superheroData.js';
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
                        </div>`;
});
