var express = require('express');
var router = express.Router();


let LOCAL_DB = [
  {
    id: "1211-2121-12123",
    title: "recharge jio",
    desc: "recharge jio pack for 1month 1gb day....",
    deadline: "november 2"
  },
];

const { v4: uuid } = require('uuid');
uuid();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('show', { tasks: LOCAL_DB });
});

router.get('/delete/:id', function (req, res, next) {

  const id = req.params.id;

  const filtereddata = LOCAL_DB.filter(function (task) {
    return task.id !== id;
  });

  LOCAL_DB = filtereddata;

  res.redirect("/");

  // res.json(filtereddata);

});

router.get('/create', function (req, res, next) {
  res.render('create');
});

router.post('/add', function (req, res, next) {

  const { title, desc } = req.body;
  if (title.length < 4 || desc.length < 15) {
    res.send(
      "<details>Length of title and desc must be 4 and 15 respectivley.<br><a href='/create'>BACK</a></details>"
    )
  }

  // let id = uuid();
  // let deadline = new Date().toDateString() + "-" + new Date().toLocaleTimeString();
  let deadline = new Date().toDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let NewTask = {
    id: uuid(),
    deadline,
    title,
    desc,
  };

  LOCAL_DB.push(NewTask);
  res.redirect("/");


  // res.json({...req.body, deadline,id})
});



router.get('/edit/:id', function (req, res, next) {

  const id = req.params.id;

  const filterdata = LOCAL_DB.filter(function (task) {
    return task.id === id;
  });

  LOCAL_DB = filterdata;

  res.render('edit', { task: filterdata[0] })
});

router.post('/edit/:id', function (req, res, next) {

  const id = req.params.id;

  const { title, desc } = req.body;

  const taskindex = LOCAL_DB.findIndex(function (task) {
    return task.id === id;
  });

  const activeindex = { ...LOCAL_DB[taskindex], title, desc };

  LOCAL_DB[taskindex] = activeindex;

  // res.json(activeindex);

  res.redirect('/');

  // res.json(activeindex);

  // console.log(LOCAL_DB);

});


module.exports = router;


