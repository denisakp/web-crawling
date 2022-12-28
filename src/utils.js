import fs from 'node:fs/promises';

// remove all duplicates from objects
export const removeDuplicate = (data) => {
    if(!data) return;
    return [...new Set(data.map(item => JSON.stringify(item)))].map(element => JSON.parse(element))
}

// remove all tabulation & back to line
export const parseText = (data) => trimText(data.replace(/(\r\n|\n|\r|\t)/gm,""));

// remove spaces before and after a string
export const trimText = (text) => {
    if (!text) return;
    return text.trim()
};

// generate json file
export const generateJSONData = async(data) => {
    await fs.writeFile(`${Date.now()}.json`, JSON.stringify(data));
}

export const formatResponse = (data) => {
    if (!data) return;
    return removeDuplicate(data.filter(item => {
        if (item.text) {
            return item.text.length !== 0
        }
    }))
};

// set an asynchronous timeout
export const waitForMe = (ms) => new Promise(resolve => setTimeout(resolve, ms * 1000));

export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
