import User from '../models/User.js';

export const updateUser = async (req, res, next) => {
  try {
    const id = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({ message: 'didnt find the user' });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
// #Delete User controller
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted');
  } catch (err) {
    next(err);
  }
};
// #Get User controller
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
// #Get all User controller
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
