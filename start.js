const concurrently = require('concurrently')

async function runCommands() {
    try {
        await concurrently([
            { command: 'node index.js', name: 'Node.js Server', prefixColor: 'cyan' }
        ])
  
        await concurrently([
            { command: 'gunicorn main:app', name: 'Flask Server', prefixColor: 'cyan' }
        ])
      console.log('All commands completed successfully.')
    } catch (error) {
      console.error('One or more commands failed:', error)
    }
}
  
runCommands()
