import { Event } from "../models/event-model.js";

export const getEvents = async (req, res) => {
  try {

    const events = await Event.find().populate('user_id', 'name').populate('assistants', 'name')

    res.status(200).json({
      ok: true,
      events
    })
    
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: 'Failed to save event'
    })
  }
}

export const getEventsByUser = async (req, res) => {
  const { uid } = req

  try {

    const events = await Event.find({ user_id: uid }).populate('user_id', 'name').populate('assistants', 'name')

    res.status(200).json({
      ok: true,
      events
    })
    
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: 'Failed to get events'
    })
  }
}

export const getEventsSubs = async (req, res) => {
  const { uid } = req
  try {
    const events = await Event.find({ assistants: uid }).populate('user_id', 'name').populate('assistants', 'name')
    
    return res.status(200).json({
      ok: true,
      events
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: 'Failed to get events'
    })
  }
}

const getEventById = async (id) => {
  const event = await Event.findById(id).populate('user_id', 'name').populate('assistants', 'name')

  return event
}

export const getEvent = async (req, res) => {
  const { id } = req.params

  try {
    const event = await getEventById(id)

    return res.status(200).json({
      ok: true,
      event
    })


  } catch (error) {
    
    res.status(400).json({
      ok: false,
      message: 'Failed to get event'
    })
  }

}

export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body)

    // Add user id to payload:
    event.user_id = req.uid
    const eventSaved = await event.save()
  
    res.status(200).json({
      ok: true,
      event: eventSaved
    })
    
  } catch (error) {

    res.status(400).json({
      ok: false,
      message: 'Failed to save event'
    })
  }
}

export const updateEvent = async (req, res) => {
  const { id } = req.params

  const { uid } = req

  try {  
    const newEvent = {
      ...req.body,
      user_id: uid
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, { new: true })
  
    res.status(200).json({
      ok: true,
      event: updatedEvent
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      message: 'Not supported id'
    }) 
  }
}

export const deleteEvent = async (req, res) => {
  const { id } = req.params
  
  try {
    await Event.findByIdAndDelete(id)
    
    res.status(200).json({
      ok: true,
      id,
      message: 'Deleted Event'
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Failed to delete event'
    })
  }
}



// Assistant controllers
export const addAssistant = async (req, res) => {
  const { id } = req.params

  const { assistant } = req.body


  try {
    // Add avoiding duplicates
    const updatedEvent = await Event.findByIdAndUpdate(id, { $addToSet: { assistants: assistant } }, { new: true })
    
    res.status(200).json({
      ok: true,
      event: updatedEvent
    })
  } catch (error) {
    console.log('assistant edition error:', error);

    res.status(500).json({
      ok: false
    })
  }
}

export const removeAssistant = async (req, res) => {
  const { id } = req.params

  const { assistant } = req.body


  try {
    // remove item
    const updatedEvent = await Event.findByIdAndUpdate(id, { $pull: { assistants: assistant } }, { new: true })
    
    res.status(200).json({
      ok: true,
      event: updatedEvent
    })
  } catch (error) {
    console.log('assistant edition error:', error);

    res.status(500).json({
      ok: false
    })
  }
}

