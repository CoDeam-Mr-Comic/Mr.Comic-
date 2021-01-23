import { superhero } from './superheroData.js';

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
		linkItems[0].classList.add('active');
		linkItems.forEach((linkItem) => {
			linkItem.classList.remove('link-item-transparent');
			linkItem.classList.add('link-item');
		});
	} else {
		navbar.classList.remove('nav-white');
		navbar.classList.add('nav-transparent');
		linkItems[0].classList.remove('active');
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
let choosenHero;

function findHero(heroName) {
	console.log(heroName);
	if (heroName) {
		const theHero = superhero.filter((hero) => {
			return hero.name.toLowerCase().includes(heroName.toLowerCase());
		});
		console.log(theHero);
		return theHero;
	} else {
		return [];
	}
}

form.addEventListener('keyup', (e) => {
	e.preventDefault();
	choosenHero = findHero(search.value);
	if (!(choosenHero.length === 0)) {
		cardContainer.innerHTML = '';
		for (let index = 0; index < choosenHero.length; index++) {
			cardContainer.innerHTML += `<div class="single-card">
							<img src=${choosenHero[index].src} alt=${choosenHero[index].name}
								class="card-img">
							<button class="btn-vote" data-id=${
								index + 1
							}><i class="far fa-heart"></i></button>
							<button class="btn-vote-full hide-btn" data-id=${
								index + 1
							}><i class="fas fa-heart"></i></button>
							<h3 class="card-title">${choosenHero[index].name}</h3>
						</div>`;
		}
		const voteBtns = document.querySelectorAll('.btn-vote');
		const votefullBtns = document.querySelectorAll('.btn-vote-full');

		voteBtns.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				const element = e.currentTarget.dataset.id;
				if (btn.dataset.id == element) {
					votefullBtns[element - 1].classList.remove('hide-btn');
					btn.classList.add('hide-btn');
				}
			});
		});

		votefullBtns.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				const element = e.currentTarget.dataset.id;
				if (btn.dataset.id == element) {
					voteBtns[element - 1].classList.remove('hide-btn');
					btn.classList.add('hide-btn');
				}
			});
		});
	}
	if (choosenHero.length === 0) {
		if (search.value.length !== 0) {
			cardContainer.innerHTML = `Sorry, doesn't match`;
		} else {
			cardContainer.innerHTML = '';
			for (let index = 0; index < 6; index++) {
				cardContainer.innerHTML += `<div class="single-card">
							<img src=${superhero[index].src} alt=${superhero[index].name}
								class="card-img">
							<button class="btn-vote" data-id=${superhero[index].id}><i class="far fa-heart"></i></button>
							<button class="btn-vote-full hide-btn" data-id=${superhero[index].id}><i class="fas fa-heart"></i></button>
							<h3 class="card-title">${superhero[index].name}</h3>
						</div>`;
			}
			vote();
		}
	}
});

//cards of the superhero
for (let index = 0; index < 6; index++) {
	cardContainer.innerHTML += `<div class="single-card">
						<img src=${superhero[index].src} alt=${superhero[index].name}
							class="card-img">
						<button class="btn-vote" data-id=${superhero[index].id}><i class="far fa-heart"></i></button>
						<button class="btn-vote-full hide-btn" data-id=${superhero[index].id}><i class="fas fa-heart"></i></button>
						<h3 class="card-title">${superhero[index].name}</h3>
					</div>`;
}

//show more btn
const showMoreBtn = document.querySelector('.more');
let cardNumbers = 12;
let indexNum = 6;

const loadMore = () => {
	for (let index = indexNum; index < cardNumbers; index++) {
		cardContainer.innerHTML += `<div class="single-card">
                    <img src=${superhero[index].src} alt=${superhero[index].name}
                        class="card-img">
                    <button class="btn-vote" data-id=${superhero[index].id}><i class="far fa-heart"></i></button>
                    <button class="btn-vote-full hide-btn" data-id=${superhero[index].id}><i class="fas fa-heart"></i></button>
                    <h3 class="card-title">${superhero[index].name}</h3>
				</div>`;
	}
	indexNum = cardNumbers;
	cardNumbers += 6;
	vote();
};

setInterval(() => {
	if (cardNumbers > superhero.length) {
		showMoreBtn.removeEventListener('click', loadMore, true);
	} else {
		showMoreBtn.addEventListener('click', loadMore, true);
	}
}, 100);

//add to favorite btn
function vote() {
	const voteBtns = document.querySelectorAll('.btn-vote');
	const votefullBtns = document.querySelectorAll('.btn-vote-full');

	voteBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const element = e.currentTarget.dataset.id;
			if (btn.dataset.id == element) {
				votefullBtns[element - 1].classList.remove('hide-btn');
				btn.classList.add('hide-btn');
			}
		});
	});

	votefullBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const element = e.currentTarget.dataset.id;
			if (btn.dataset.id == element) {
				voteBtns[element - 1].classList.remove('hide-btn');
				btn.classList.add('hide-btn');
			}
		});
	});
}

vote();
