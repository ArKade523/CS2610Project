import axios from 'axios';
import { spawn } from 'child_process';

// Initialize retry count and maximum retries
let retries = 0;
const maxRetries = 10;

// Function to check server health
const checkServer = async () => {
  try {
    const response = await axios.get('http://localhost:3000/health-check');
    if (response.status === 200) {
      console.log('Server is running. CI check passed.');
      process.exit(0);  // Exit with success code
    }
  } catch (error) {
    retries++;
    if (retries < maxRetries) {
      console.log('Retrying to connect to server...');
      setTimeout(checkServer, 5000);  // Wait for 5 seconds before retrying
    } else {
      console.log('Server is not running properly.');
      process.exit(1);  // Exit with failure code
    }
  }
};

// Start the server using spawn
const server = spawn('npx', ['ts-node', './src/index.ts']);

// Listen to stdout and stderr of the server process
server.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
  // Assuming the server prints "Server started on port 3000" when it's ready
  if (data.toString().includes('Server started on port 3000')) {
    checkServer();  // Start the health check loop
  }
});

server.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// If the server process closes, exit the script with a failure code
server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(1);
});
