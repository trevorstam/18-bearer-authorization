'use strict';
import express from 'express';
const router = express.Router();

//import the model from the models folder
import usState from '../models/us-state';
import city from '../models/city';

// import auth from '../auth/middleware';

import sendJSON from '../middleware/sendJSON';

const models = {
  'state': usState,
  'city': city,
};


router.get('/api/v1/:model', (req, res, next) => {
  const model = models[req.params.model];
  model.find({})
    .then(result => {
      sendJSON(result, res);
    })
    .catch(next);
});

router.get('/api/v1/:model/:id', (req, res, next) => {
  const model = models[req.params.model];
  model.findOne({
      _id: req.params.id,
    })
    .then(result => {
      sendJSON(result, res);
    })
    .catch(next);
});

router.post('/api/v1/:model', (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.statusCode = 400;
    res.statusMessage = 'bad request';
    res.setHeader('Content-Type', 'application/json');
    res.end();
  } else {
    const model = models[req.params.model];
    model.create(req.body)
      .then(result => sendJSON(result, res))
      .catch(next);
  }
});

router.delete('/api/v1/:model/:id', (req, res, next) => {
  const model = models[req.params.model];
  model.findByIdAndRemove(req.params.id)
    .then(result => sendJSON(result, res))
    .catch(next);
});

router.put('/api/v1/:model/:id', (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.statusCode = 400;
    res.statusMessage = 'bad request';
    res.setHeader('Content-Type', 'application/json');
    res.end();
  } else {
    const model = models[req.params.model];
    model.findByIdAndUpdate({
        _id: req.params.id,
      }, req.body, {
        new: true,
      })
      .then(result => sendJSON(result, res))
      .catch(next);
  }
});

router.patch('/api/v1/:model/:id', (req, res, next) => {
  const model = models[req.params.model];
  model.findOneAndUpdate({
      _id: req.params.id,
    }, req.body, {
      new: true,
    })
    .then(result => sendJSON(result, res))
    .catch(next);
});


export default router;