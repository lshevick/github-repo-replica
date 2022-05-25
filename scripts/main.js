import { token } from '../modules/auth_token.js';

const BASE_URL = 'https://api.github.com/users/lshevick';
const headers = {
    'User_Agent': 'lshevick',
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${token}`,
};

const generateRepos = (data) => {
    const source = document.querySelector('#repo-template').innerHTML;
    const template = Handlebars.compile(source);
    const context = {repos: data};
    const html = template(context);
    console.log(context);
    document.querySelector('.repo-wrapper').innerHTML = html;
}

const generateProfile = (data) => {
    const source = document.querySelector('#profile-template').innerHTML;
    const template = Handlebars.compile(source);
    const context = {profile: data};
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