const { faker } = require('@faker-js/faker');

const marvelCharacters = [
    { firstName: 'Tony', lastName: 'Stark', emailAlias: 'tony.stark', domain: 'stark-industries.com' },
    { firstName: 'Peter', lastName: 'Parker', emailAlias: 'peter.parker', domain: 'dailybugle.com' },
    { firstName: 'Steve', lastName: 'Rogers', emailAlias: 'steve.rogers', domain: 'shield.gov' },
    { firstName: 'Natasha', lastName: 'Romanoff', emailAlias: 'natasha.romanoff', domain: 'shield.gov' },
    { firstName: 'Wanda', lastName: 'Maximoff', emailAlias: 'wanda.maximoff', domain: 'westview.net' },
    { firstName: 'Nick', lastName: 'Fury', emailAlias: 'nick.fury', domain: 'shield.gov' },
];

function generateUserData() {
    const character = faker.helpers.arrayElement(marvelCharacters);

    return {
        firstName: character.firstName,
        lastName: character.lastName,
        email: faker.internet.email({ firstName: character.emailAlias, lastName: faker.number.int({ min: 100, max: 999 }).toString(), provider: character.domain }),
        password: faker.internet.password({ length: 10, memorable: false, pattern: /\w/, prefix: 'Aa1!' }),
    };
}

module.exports = { generateUserData };