import { superhero } from './superheroData.js';

//local storage
if (!localStorage.getItem('superhero')) {
	localStorage.setItem('superhero', JSON.stringify(superhero));
}
const favorite = JSON.parse(localStorage.getItem('superhero')) || [];

// preloader
const preloader = document.querySelector('.preloader');
const showElement = document.querySelectorAll('.hide');

window.addEventListener('load', function () {
	preloader.classList.add('hide-preloader');
	showElement.forEach((element) => {
		element.classList.remove('hide');
	});
});

//header stuff
const navbar = document.querySelector('.nav-transparent');
const linkItems = document.querySelectorAll('.link-item-transparent');

window.addEventListener('scroll', function () {
	const scrollHeight = window.pageYOffset;
	const navHeight = navbar.getBoundingClientRect().height;

	if (scrollHeight > navHeight) {
		navbar.classList.add('nav-white');
		navbar.classList.remove('nav-transparent');
		linkItems.forEach((linkItem) => {
			linkItem.classList.remove('link-item-transparent');
			linkItem.classList.add('link-item');
		});
	} else {
		navbar.classList.remove('nav-white');
		navbar.classList.add('nav-transparent');
		linkItems.forEach((linkItem) => {
			linkItem.classList.add('link-item-transparent');
			linkItem.classList.remove('link-item');
		});
	}
});

//main stuff
const cardContainer = document.querySelector('.card-container');

//search bar
const form = document.querySelector('.form');
const search = document.getElementById('search');

function findHero(heroName) {
	if (heroName) {
		const theHero = favorite.filter((hero) => {
			return hero.name.toLowerCase().includes(heroName.toLowerCase());
		});
		return theHero;
	} else {
		return [];
	}
}

form.addEventListener('keyup', (e) => {
	e.preventDefault();
	const choosenHero = findHero(search.value);
	if (!(choosenHero.length === 0)) {
		document.querySelector('.more').classList.add('hide');
		cardContainer.innerHTML = '';
		for (let index = 0; index < choosenHero.length; index++) {
			cardContainer.innerHTML += `<div class="single-card" >
							<img src=${choosenHero[index].src} alt=${choosenHero[index].name}
								class="card-img" data-id=${choosenHero[index].id}>
							<button class="btn-vote" data-id=${choosenHero[index].name}><i class="far fa-heart"></i></button>
							<button class="btn-vote-full hide-btn" data-id=${choosenHero[index].name}><i class="fas fa-heart"></i></button>
							<h3 class="card-title">${choosenHero[index].name}</h3>
						</div>`;
		}

		description();

		const voteBtns = document.querySelectorAll('.btn-vote');
		const votefullBtns = document.querySelectorAll('.btn-vote-full');

		voteBtns.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				const element = e.currentTarget.dataset.id;
				const targetHero = favorite.find((hero) => {
					return hero.name === element;
				});
				const index = choosenHero.indexOf(targetHero);

				const modifiedHero = { ...targetHero };
				modifiedHero.vote++;
				favorite.splice(favorite.indexOf(targetHero), 1, modifiedHero);
				choosenHero.splice(choosenHero.indexOf(targetHero), 1, modifiedHero);

				if (btn.dataset.id == element) {
					votefullBtns[index].classList.remove('hide-btn');
					btn.classList.add('hide-btn');
				}
				localStorage.setItem('superhero', JSON.stringify(favorite));
			});
		});

		votefullBtns.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				const element = e.currentTarget.dataset.id;
				const targetHero = favorite.find((hero) => {
					return hero.name === element;
				});
				const index = choosenHero.indexOf(targetHero);

				if (targetHero.vote >= 1) {
					const modifiedHero = { ...targetHero };
					modifiedHero.vote--;
					favorite.splice(favorite.indexOf(targetHero), 1, modifiedHero);
				}

				if (btn.dataset.id == element) {
					voteBtns[index].classList.remove('hide-btn');
					btn.classList.add('hide-btn');
				}
				localStorage.setItem('superhero', JSON.stringify(favorite));
			});
		});
	}

	if (choosenHero.length === 0) {
		if (search.value.length !== 0) {
			cardContainer.innerHTML = `<p class='not-found'>Sorry, doesn't match any of our superhero names</p>`;
			document.querySelector('.more').classList.add('hide');
		} else {
			document.querySelector('.more').classList.remove('hide');
			cardContainer.innerHTML = '';
			for (let index = 0; index < 6; index++) {
				cardContainer.innerHTML += `<div class="single-card" >
							<img src=${superhero[index].src} alt=${superhero[index].name}
								class="card-img" data-id=${superhero[index].id}>
							<button class="btn-vote" data-id=${superhero[index].name}><i class="far fa-heart"></i></button>
							<button class="btn-vote-full hide-btn" data-id=${superhero[index].name}><i class="fas fa-heart"></i></button>
							<h3 class="card-title">${superhero[index].name}</h3>
						</div>`;
			}
			vote();
			description();
		}
	}
});

//cards of the superhero
for (let index = 0; index < 6; index++) {
	cardContainer.innerHTML += `<div class="single-card" >
						<img src=${superhero[index].src} alt=${superhero[index].name}
							class="card-img" data-id=${superhero[index].id}>
						<button class="btn-vote" data-id=${superhero[index].name}><i class="far fa-heart"></i></button>
						<button class="btn-vote-full hide-btn" data-id=${superhero[index].name}><i class="fas fa-heart"></i></button>
						<h3 class="card-title">${superhero[index].name}</h3>
					</div>`;
}

//show more btn
const showMoreBtn = document.querySelector('.more');
let cardNumbers = 12;
let indexNum = 6;

const loadMore = () => {
	for (let index = indexNum; index < cardNumbers; index++) {
		cardContainer.innerHTML += `<div  class="single-card" >
                    <img src=${superhero[index].src} alt=${superhero[index].name}
                        class="card-img" data-id=${superhero[index].id}>
                    <button class="btn-vote" data-id=${superhero[index].name}><i class="far fa-heart"></i></button>
                    <button class="btn-vote-full hide-btn" data-id=${superhero[index].name}><i class="fas fa-heart"></i></button>
                    <h3 class="card-title">${superhero[index].name}</h3>
				</div>`;
	}
	indexNum = cardNumbers;
	if (superhero.length - cardNumbers > 6) {
		cardNumbers += 6;
	} else {
		cardNumbers += superhero.length - cardNumbers;
	}
	vote();
	description();
};

showMoreBtn.addEventListener('click', loadMore);

//add to favorite btn
function vote() {
	const voteBtns = document.querySelectorAll('.btn-vote');
	const votefullBtns = document.querySelectorAll('.btn-vote-full');

	voteBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const element = e.currentTarget.dataset.id;
			const targetHero = favorite.find((hero) => {
				return hero.name === element;
			});
			const index = targetHero.id - 1;
			const modifiedHero = { ...targetHero };
			modifiedHero.vote++;
			favorite.splice(favorite.indexOf(targetHero), 1, modifiedHero);

			if (btn.dataset.id == element) {
				votefullBtns[index].classList.remove('hide-btn');
				btn.classList.add('hide-btn');
			}
			localStorage.setItem('superhero', JSON.stringify(favorite));
		});
	});

	votefullBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const element = e.currentTarget.dataset.id;
			const targetHero = favorite.find((hero) => {
				return hero.name === element;
			});
			const index = targetHero.id - 1;
			if (targetHero.vote >= 1) {
				const modifiedHero = { ...targetHero };
				modifiedHero.vote--;
				favorite.splice(favorite.indexOf(targetHero), 1, modifiedHero);
			}
			if (btn.dataset.id == element) {
				voteBtns[index].classList.remove('hide-btn');
				btn.classList.add('hide-btn');
			}
			localStorage.setItem('superhero', JSON.stringify(favorite));
		});
	});
}

vote();

const description = () => {
	const singleCards = document.querySelectorAll('.card-img');
	singleCards.forEach((singleCard) => {
		singleCard.addEventListener('click', (e) => {
			e.preventDefault();
			const element = Number(e.currentTarget.dataset.id);
			let value = element;
			localStorage.setItem('value', value);
			window.location.href = 'description.html';
		});
	});
};

description();
