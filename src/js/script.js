let openBtn = document.querySelector('.header__search-btn');
let closeBtn = document.querySelector('.header__search-opened-btn__close-icon');
let blockVisible = document.querySelector('.header__search-opened');

openBtn.addEventListener('click', function() {
  blockVisible.classList.remove('not-visible');
})

closeBtn.addEventListener('click', function() {
  blockVisible.classList.add('not-visible');
})

new JustValidate('.about__form', {
	rules: {
		mail: {
			required: true,
			email: true
		},
	},
	messages: {
		mail: {
			required: "Недопустимый формат",
			email: "Недопустимый формат"
		},
	},
});

ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });

    var myPlacemark = new ymaps.Placemark([55.770117, 37.639383], {}, {
    	iconLayout: 'default#image',
    	iconImageHref: 'img/subtract.svg',
    	iconImageSize: [12, 12],
    	iconImageOffset: [-3, -42]
    });
   myMap.geoObjects.add(myPlacemark); 
} 

let searchClose = document.querySelector('.search__place-btn__close');
let searchPlace = document.querySelector('.contacts__search-place');

searchClose.addEventListener('click', function() {
	searchPlace.classList.add('search__not-visible');
});

new JustValidate('.contacts__form', {
	rules: {
		name: {
			required: true,
			minLength: 2,
			maxLength: 20,
		},
		mail: {
			required: true,
			email: true
		},
	},
	messages: {
		name: {
			required: "Вы не ввели имя",
			minLength: "Введите достаточное количество символов",
			maxLength: "Вы ввели больше чем положено"
		},
		mail: {
			required: "Недопустимый формат",
			email: "Недопустимый формат"
		},
	},
});

let burger = document.querySelector('.burger')
let nav = document.querySelector('.header__nav')
let navCloseBtn = document.querySelector('.header__close-btn')

burger.addEventListener('click', function() {
	nav.classList.remove('header__nav-not-visible')
	navCloseBtn.classList.remove('header__close-not-visible')
})

navCloseBtn.addEventListener('click', function() {
	nav.classList.add('header__nav-not-visible')
	navCloseBtn.classList.add('header__close-not-visible')
})