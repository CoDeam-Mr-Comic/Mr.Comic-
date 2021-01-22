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

//cards of the superhero
const cardContainer = document.querySelector('.card-container');
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
};

setInterval(() => {
	if (cardNumbers > superhero.length) {
		showMoreBtn.removeEventListener('click', loadMore, true);
	} else {
		showMoreBtn.addEventListener('click', loadMore, true);
	}
}, 100);

//add to favorite btn
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
