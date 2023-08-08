const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thoughtController')

router.get('/', thoughtController.getAllThoughts);
router.get('/:id', thoughtController.getthoughtById);
router.post('/', thoughtController.createThought);
router.put('/:id', thoughtController.updateThought);
router.delete('/:id', thoughtController.deleteThought);
router.post('/:thoughtId/reaction', thoughtController.createReaction);
router.delete('/:thoughtId/react/:reactionId', thoughtController.deleteReaction);

module.exports = router;