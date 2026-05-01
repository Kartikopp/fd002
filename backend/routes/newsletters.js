const express = require('express');
const router = express.Router();

let subscribers = [];

// POST /subscribe for email subscription
router.post('/subscribe', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    subscribers.push({ email, preferences: {} });
    return res.status(201).json({ message: 'Subscribed successfully' });
});

// POST /unsubscribe
router.post('/unsubscribe', (req, res) => {
    const { email } = req.body;
    subscribers = subscribers.filter(subscriber => subscriber.email !== email);
    return res.status(200).json({ message: 'Unsubscribed successfully' });
});

// GET /subscribers (admin only)
router.get('/subscribers', (req, res) => {
    // This should include authentication to check if the user is an admin
    return res.status(200).json(subscribers);
});

// PUT /:id/preferences for subscription preferences
router.put('/:id/preferences', (req, res) => {
    const { id } = req.params;
    const { preferences } = req.body;
    const subscriber = subscribers[id];
    if (subscriber) {
        subscriber.preferences = preferences;
        return res.status(200).json({ message: 'Preferences updated' });
    }
    return res.status(404).json({ message: 'Subscriber not found' });
});

module.exports = router;