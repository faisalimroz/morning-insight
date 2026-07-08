const userService = require('../services/user.service');
const { sendSuccess } = require('../utils/response');

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();

  return sendSuccess(res, {
    message: 'get all users data',
    data: users,
  });
};

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'User created successfully',
    data: user,
  });
};

const updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);

  return sendSuccess(res, {
    message: 'User updated successfully',
    data: user,
  });
};

const deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);

  return sendSuccess(res, {
    message: 'User deleted successfully',
  });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
