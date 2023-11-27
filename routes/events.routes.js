// Events Routes
// /api/events

import { Router } from 'express'
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent, addAssistant, removeAssistant, getEventsByUser, getEventsSubs } from '../controllers/events.controllers.js'
import { validateJWT } from '../middlewares/validateJWT.js'
import { check } from 'express-validator'
import { validateResults } from '../middlewares/validateResults.js'
import { isDate } from '../helpers/isDate.js'
import { validateEvent, authorizationToEditEvent } from '../middlewares/validateEvent.js'

export const eventsRouter = Router()

eventsRouter.get('/', getEvents)

// Middleware use to all events routes below here
eventsRouter.use(validateJWT)

eventsRouter.get('/by-user', getEventsByUser)

eventsRouter.get('/subscriptions', getEventsSubs)

eventsRouter.get('/:id', authorizationToEditEvent, getEvent)

eventsRouter.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    validateResults
  ],
  createEvent
)

eventsRouter.patch('/:id', authorizationToEditEvent, updateEvent)

eventsRouter.delete('/:id', authorizationToEditEvent, deleteEvent)


// Subscription for event:
eventsRouter.patch('/:id/add-assistant', validateEvent, addAssistant)

eventsRouter.patch('/:id/remove-assistant', validateEvent, removeAssistant)
