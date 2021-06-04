import './sass/main.scss';
import fetchCountry from './js/fetchCountries.js';
import { debounce } from 'lodash';
import countryListTemplate from './template/countries-list.hbs';
import countryCardTemplate from './template/country-card.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';


const refs = {
    input: document.querySelector('.input-js'),
    cardCountries: document.querySelector('.card-countries-container'),
};

refs.input.addEventListener('input', debounce(OnInputGetId, 500));

function OnInputGetId(e) {
    clearContainer();
    let inputValue = e.target.value.trim();

    if (refs.input.length < 1) return;

    fetchCountry(inputValue).then(countries => {

        if (countries.length > 10) {
            error({
                text: 'Too many matches found. Please enter a more specific query!',
                mode: 'light',
                shadow: true,
                closer: true,
                sticker: false,
                hide: true,
                delay: 2000,
            });
            return;
        }

        if (countries.length >= 2 && countries.length <= 10) {
            renderCountryList(countries);
        }
        if (countries.length === 1) {
            renderCountryCard(countries);
            clearInput();
        }
    })
        .catch(onFetchError);
};

function renderCountryList(countries) {
    const template = countryListTemplate(countries);
    refs.cardCountries.innerHTML = template;
};

function renderCountryCard(countryName) {
    const templateCard = countryCardTemplate(countryName);
    refs.cardCountries.innerHTML = templateCard;
};

function clearContainer() {
    refs.cardCountries.innerHTML = '';
};

function clearInput() {
    refs.input.value = '';
};

function onFetchError(err) {
    error({
        text: `${err}`,
        mode: 'dark',
        closer: true,
        shadow: true,
        sticker: false,
        hide: true,
        delay: 2000,
    });
};

