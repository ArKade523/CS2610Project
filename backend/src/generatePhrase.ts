import { Response } from 'express';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

function generatePhrase(filePath: string, res: Response) {
  exec(path.join(__dirname, './utils/generatePhrase.sh'), (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error generating the phrase.');
    }
    const newPhrase = stdout.trim();
    const fileContent = {
      phrase: newPhrase,
      timestamp: new Date().toISOString(),
    };

    // Write the new phrase to the file
    fs.writeFile(filePath, JSON.stringify(fileContent), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).send('Error saving the new phrase.');
      }

      console.log('New phrase saved to file: ', newPhrase);
      // Return the new phrase
      res.json({ phrase: newPhrase });
    });
  });
}

export default generatePhrase;