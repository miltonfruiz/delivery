const Model = require('../models/Model');

async function getAll(req, res) {
  try {
    const models = await Model.find().populate('customerId').populate('restaurantId');
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getOne(req, res) {
  try {
    const id = req.params.id;
    const model = await Model.findById(id).populate('customerId').populate('restaurantId');
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function create(req, res) {
  try {
    const model = new Model(req.body);
    await model.save();
    res.status(201).json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const model = await Model.findById(id);
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    Object.assign(model, req.body);
    await model.save();
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req, res) {
  try {
    const id = req.params.id;
    await Model.findByIdAndDelete(id);
    res.status(204).json({ message: 'Model deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getAll, getOne, create, update, remove };