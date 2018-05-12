var express = require('express');
var router = express.Router();
var cors = require('cors');
var mongoose = require('mongoose');

var Todo = require('../models/todo')

router.use(cors())

/* GET home page. */
router.get('/', function(req, res, next) {
  Todo.find({}, (err, todo_all) => {
    if (err) {
      return res.json({
        success: false,
        msg: "Get all todo failed."
      })
    }
    res.json({
      success: true,
      result: todo_all
    })
  })
});

router.post('/', function(req, res, next) {
  if(req.body.topic) {
    var newTodo = new Todo({
      topic: req.body.topic,
      detail: req.body.detail,
      completed: false
    })
    newTodo.save(function(err) {
      if (err) {
        return res.json({
          success: false,
          msg: 'Save ' + req.body.topic + ' failed.'
        })
      }
      res.json({
        success: true,
        msg: 'Save ' + req.body.topic + ' successfully.'
      })
    });
  }
});

router.delete('/:id', function (req, res, next) {
  Todo.findOne({_id: req.params.id}, function(err, todo) {
    if (err) {
      return res.json({
        success: false,
        msg: 'Delete ' + req.params.id + ' failed.'
      })
    }
    todo.remove(function (err2) {
      if (err) {
        return res.json({
          success: false,
          msg: 'Delete ' + req.params.id + ' failed.'
        })
      }
      res.json({
        success: true,
        msg: 'Delete "' + req.params.id + '" successfully.'
      })
    })
  })
});

router.post('/:id/toggle', function (req, res, next) {
  Todo.findOne({_id: req.params.id}, function(err, todo) {
    if (err) {
      return res.json({
        success: false,
        msg: 'Toggle ' + req.params.id + ' failed.'
      })
    }
    if (!todo) {
      return res.json({
        success: false,
        msg: 'ID ' + req.params.id + ' not found.'
      })
    }
    todo.completed = !todo.completed
    todo.save((err2, todo2) => {
      if (err2) {
        return res.json({
          success: false,
          msg: 'Toggle ' + req.params.id + ' failed.'
        })
      }
      res.json({
        success: true,
        msg: 'Toggle ' + req.params.id + ' to ' + todo2.completed
      })
    })
  })

})

module.exports = router;
