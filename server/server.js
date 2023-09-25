
const express = require('express');

  const app = express();
  const port = 3000;
  const cors = require('cors');
  const fs = require('fs');  //Import the 'fs' module to read JSON file

  app.use(cors());



  app.use('/', express.static('public'));

  app.get('/hello', (req, res) => {
      res.send('Hello World!');
  });

  app.get('/budget', (req, res) => {
       //Read JSON file and send its content as the response
      fs.readFile('budget-data.json', 'utf8', (err, data) => {
          if (err) {
              console.error(err);
              return res.status(500).send('Error reading JSON file');
          }
          res.json(JSON.parse(data));
      });
  });

  app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
  });



 