import { token } from '../modules/auth_token.js';
// import { formatDistanceToNow } from '../date-fns';

const BASE_URL = 'https://api.github.com/users/lshevick';
const headers = {
    'User_Agent': 'lshevick',
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${token}`,
};

// Handlebars.registerHelper('formatDate', function (dateString) {
//     return new Handlebars.safeString(
//         formatDistanceToNow(dateString)
//     );
// });

const updateLanguageColor = () => {
    const langColor = document.querySelector('.repo-lang-color');
    const lang = document.querySelector('.repo-language');

    switch (lang.innerHTML) {
        case 'HTML':
            langColor.style.backgroundColor = '#D45635';
            break;
        case 'CSS':
            langColor.style.backgroundColor = '#524078';
            break;
        case 'Javascript':
            langColor.style.backgroundColor = '#EFDF70';
            break;
    }
}


const generateRepos = (data) => {
    const source = document.querySelector('#repo-template').innerHTML;
    const template = Handlebars.compile(source);
    const context = { repos: data };
    const html = template(context);
    console.log(context);
    document.querySelector('.repo-wrapper').innerHTML = html;
}

const generateProfile = (data) => {
    const source = document.querySelector('#profile-template').innerHTML;
    const template = Handlebars.compile(source);
    const context = { profile: data };
    const html = template(context);
    console.log(context);
    document.querySelector('.profile-wrapper').innerHTML = html;
}

fetch(`${BASE_URL}/repos`, headers)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response bad');
        } else {
            return response.json();
        }
    })
    .then(data => generateRepos(data));


fetch(`${BASE_URL}`, headers)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response bad');
        } else {
            return response.json();
        }
    })
    .then(data => generateProfile(data));



    updateLanguageColor();