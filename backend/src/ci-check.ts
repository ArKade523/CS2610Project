import axios from 'axios';
import { exec } from 'child_process';

// Start the server
exec('npx ts-node ./src/index.ts'); 

// Give the server some time to start
setTimeout(async () => {
  try {
    // Check if the server is running
    const response = await axios.get('http://127.0.0.1:3000/health-check');

    if (response.status === 200) {
      console.log('Server is running. CI check passed.');
      process.exit(0);  // Exit with success code
    } else {
      console.log('Server is not running properly.');
      process.exit(1);  // Exit with failure code
    }
  } catch (error) {
    console.log('Could not make a request to the server. It is likely not running.');
    process.exit(1);  // Exit with failure code
  }
}, 5000);  // Wait for 5 seconds
