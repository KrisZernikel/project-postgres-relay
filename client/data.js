const axios = require('axios')
const { faker } = require('@faker-js/faker');

const graphqlClient = axios.create({
    baseURL: 'http://localhost:5000'
})

async function requestGraph ({ query, operationName, variables }) {
    return graphqlClient.post('/graphql', { query, operationName, variables })
}

function createPost({ message }) {
    return `
    mutation CreatePost {
        createPost(input: { post: {message: "${message}"}}) {
          post {
            id
            message
          }
        }
      }
    `
}

;(async () => {
    const max = 100
    for (let x = 0; x < max; x++) {
        const message = faker.definitions.lorem.words.concat(' ')
        const query = createPost({ message })
        await requestGraph({ query })
    }
})()