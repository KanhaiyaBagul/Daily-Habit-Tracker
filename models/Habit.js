// models/Habit.js
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const dataFile = path.join(__dirname, '..', 'data', 'habits.json');

const initDataStore = async () => {
    try {
        await fs.mkdir(path.dirname(dataFile), { recursive: true });
        try {
            await fs.access(dataFile);
        } catch {
            await fs.writeFile(dataFile, JSON.stringify([]));
        }
    } catch (err) {
        console.error('Error initializing data store:', err);
    }
};

initDataStore();

const readData = async () => {
    try {
        const data = await fs.readFile(dataFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeData = async (data) => {
    await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
};

module.exports = {
    readData,
    writeData
};
