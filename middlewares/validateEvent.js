import { Event } from "../models/event-model.js"

const getEventById = async (id) => {
  const event = await Event.findById(id).populate('user_id', 'name')
  return event
}

const handleEventNotFound = (res) => {
  return res.status(404).json({
    ok: false,
    message: 'Event not found'
  })
}

export const validateEvent = async (req, res, next) => {
  try {
    const { id } = req.params
  
    const event = await getEventById(id)
  
    if(!event) {
      return handleEventNotFound(res)
    }
  
    next()
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Internal Server Error',
    });
  }
}

export const authorizationToEditEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const { uid } = req

    const event = await getEventById(id)

    if(!event) {
      return handleEventNotFound(res)
    }

    if(event.user_id._id.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: 'Unable to manipulate this event'
      })
    }

    next()
} catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Internal Server Error',
    });
  }
  
}
