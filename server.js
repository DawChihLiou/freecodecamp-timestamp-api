const express = require('express');
const app = express();

// index page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/:date', (req, res) => {
    'use strict';
    
    const timestampRegex = /[0-9]*/;
    const options        = { year: 'numeric', month: 'long', day: 'numeric' };
    const param          = req.params.date;
    
    let unix    = null; 
    let natural = null;
    let date;
    
    if (timestampRegex.test(parseInt(param))) {
        let ts = parseInt(param);
        
        date    = new Date(param.length === 10 ? ts * 1000 : ts);
        unix    = ts;
        natural = date.toLocaleDateString('en-US', options);
    } else if (param === (new Date(param)).toLocaleDateString('en-US', options)) {
        date    = new Date(param);
        unix    = date.getTime() / 1000;
        natural = param;
    }
    
    res.send({ unix, natural });
});

app.listen(8080, () => {
    console.log('Example app is listening to port 8080');
});