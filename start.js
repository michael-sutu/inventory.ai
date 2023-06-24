const concurrently = require('concurrently')

concurrently([
    { command: 'pip install -r install.txt', name: 'Flask Build', prefixColor: 'cyan' },
    { command: 'node index.js', name: 'Node.js Server', prefixColor: 'cyan' },
    { command: 'gunicorn main:app', name: 'Flask Server', prefixColor: 'cyan' }
])
    .then(() => {
        console.log('Both servers are online.')
    })
    .catch((err) => {
        console.error('Error starting servers:', err)
    })
