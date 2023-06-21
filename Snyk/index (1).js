'use strict';

const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');
const rateLimit = require('express-rate-limit')


const options = {};
const flag = '***********';
const docHtml = fs.readFileSync('./index.html', 'utf-8');

app.use(helmet());

app.get('/', (req, res) => {
    res.send(docHtml);
});

app.post('/echo', (req, res) => {
    const out = {
        userID: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        time: Date.now()
    };

    _.merge(out, req.body);

    if (options.flag) {
        out.flag = flag;
    } else {
        out.flag = 'disabled';
    }

    res.json(out);
    process.exit(0);
});

app.listen(8000);
