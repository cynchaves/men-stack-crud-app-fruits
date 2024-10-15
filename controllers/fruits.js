const Fruit = require('../models/fruit');

const home = ((req, res) => {
    res.render('index.ejs');
});

const index = async (req, res) => {
  const foundFruits = await Fruit.find();
  res.render('fruits/index.ejs', {fruits: foundFruits});
};

const addNewForm = ((req, res) => {
    res.render('fruits/new.ejs');
});

const create = async (req, res) => {
    if (req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect('/fruits');
};

const show = async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/show.ejs', {fruit: foundFruit});
};

const deleteOne = async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect('/fruits');
};

const updateForm = async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/edit.ejs', {fruit: foundFruit});
};

const update = async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
    res.redirect('/fruits');
};

module.exports = {
  index,
  home,
  addNewForm,
  create,
  show,
  deleteOne,
  updateForm,
  update,
};
