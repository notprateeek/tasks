import Task from '../models/task.js'
import createError from '../utils/createError.js'

export const createTask = async (req, res, next) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      user: req.user.id,
      status: req.body.status,
    })

    const saveTask = await newTask.save()
    return res.status(201).json(saveTask)
  } catch (error) {
    return next(error)
  }
}

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
    return res.status(200).json(tasks)
  } catch (error) {
    return next(error)
  }
}

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).exec()

    if (!task) {
      return next(createError({ status: 404, message: 'Task not found' }))
    }

    if (task.user.toString() !== req.user.id) {
      return next(createError({ status: 401, message: 'Not your task' }))
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true },
    )
    return res.status(200).json(updatedTask)
  } catch (error) {
    return next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).exec()

    if (!task) {
      return next(createError({ status: 404, message: 'Task not found' }))
    }

    if (task.user.toString() !== req.user.id) {
      return next(createError({ status: 401, message: 'Not your task' }))
    }

    await Task.findByIdAndDelete(req.params.id)
    return res.status(200).json('Task deleted')
  } catch (error) {
    return next(error)
  }
}
