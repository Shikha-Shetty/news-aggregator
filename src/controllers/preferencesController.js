const User = require('../models/User');

var getPreferences = (req, res) => {
    res.json(req.user.preferences);
}

var updatePreferences = (req, res) => {
    const newPreferences = req.body;
    User.findById(req.user._id)
        .then(user => {
            if (!user) {
                return res.status(404).send({message: "User not found"});
            }
            user.preferences = newPreferences;
            return user.save();
        })
        .then(updatedUser => {
            if (updatedUser) {
                return res.status(200).json({updatedUser, message: "Preference updated successfully"});
            }
        })
        .catch(error => {
            console.error('Error updating user:', error);
        });
}

module.exports = {getPreferences, updatePreferences};