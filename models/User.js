const fs = require('fs').promises;
const path = require('path');

const dataFile = path.join(__dirname, '..', 'data', 'user.json');

const initDataStore = async () => {
    try {
        await fs.mkdir(path.dirname(dataFile), { recursive: true });
        try {
            await fs.access(dataFile);
        } catch {
            await fs.writeFile(dataFile, JSON.stringify({ xp: 0, level: 1 }));
        }
    } catch (err) {
        console.error('Error initializing user data store:', err);
    }
};

initDataStore();

const readUserData = async () => {
    try {
        const data = await fs.readFile(dataFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { xp: 0, level: 1 };
    }
};

const writeUserData = async (data) => {
    await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
};

module.exports = {
    readUserData,
    writeUserData
};
