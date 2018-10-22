import '../scss/styles.scss';

document.querySelector('.bs-books-list').focus();

const searchIcon = document.getElementsByClassName('bs-search__icon')[0];
const searchBlock = document.getElementsByClassName('bs-search')[0];
const searchInput = document.getElementsByClassName('bs-search__input')[0];
const sidebar = document.getElementsByClassName('bs-sidebar')[0];
const headerToggleIcon = document.getElementsByClassName('bs-header__title-icon')[0];

if (screen.width < 1024) {
	headerToggleIcon.addEventListener('click', () => {	
		if (!sidebar.classList.contains('bs-sidebar--visible')) {
			sidebar.classList.add('bs-sidebar--visible');
		} else {
			sidebar.classList.remove('bs-sidebar--visible');
		}
	});
	
	searchIcon.addEventListener('click', () => {
		if (!searchBlock.classList.contains('bs-search--visible')) {
			searchBlock.classList.add('bs-search--visible');
			searchInput.focus();
			searchInput.addEventListener('blur', onBlur);
		}
	});
}

function onBlur() {
	searchBlock.classList.remove('bs-search--visible');
	searchInput.value = '';
}