const { readUserData, writeUserData } = require('../models/User');

const calculateLevel = (xp) => {
    // Level 1 = 0 XP
    // Level 2 = 100 XP
    // Level 3 = 200 XP
    // Level 10 = 900 XP
    return Math.floor(xp / 100) + 1;
};

// @desc    Get user stats (XP, Level)
// @route   GET /api/user
exports.getUserStats = async (req, res) => {
    try {
        const user = await readUserData();
        
        // Ensure level is calculated properly based on XP
        const currentLevel = calculateLevel(user.xp);
        if (user.level !== currentLevel) {
            user.level = currentLevel;
            await writeUserData(user);
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.calculateLevel = calculateLevel;
