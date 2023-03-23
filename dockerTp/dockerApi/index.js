'use strict';

const express = require('express');
const { dirname } = require('path');
const path=require('path');

// Constants
const PORT = 8083;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/',function(req, res)  {
  res.sendFile(path.join(__dirname,'/Users.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});