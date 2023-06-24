const concurrently = require('concurrently')

async function runCommands() {
    try {
      await concurrently([
        { command: 'pip install -r install.txt', name: 'Flask Build', prefixColor: 'cyan' }
      ])
  
      await concurrently([
        { command: 'node index.js', name: 'Node.js Server', prefixColor: 'cyan' }
      ])
  
      setTimeout(async (e) => {
        await concurrently([
            { command: 'gunicorn main:app', name: 'Flask Server', prefixColor: 'cyan' }
        ])
      }, 120000)
      
  
      console.log('All commands completed successfully.')
    } catch (error) {
      console.error('One or more commands failed:', error)
    }
}
  
runCommands()
