const sniCodes = require('./sni_codes.json');
const createFuseInstance = require('./fuse');

const fuse = createFuseInstance(sniCodes);

function validateSniCode(code) {
    if (typeof code !== 'string') {
        throw new Error('SNI code must be a string');
    }
    return sniCodes.some(sni => sni.code === code.trim());
}

function calculateRelevance(score) {
    return ((1 - score) * 100).toFixed(2);
}

function searchSniCodes(keyword) {
    if (!keyword || typeof keyword !== 'string' || keyword.trim().length < 2) {
        return []; // Return early if keyword is empty, invalid, or too short
    }

    // Perform the search
    const results = fuse.search(keyword.trim());
    return results.map(result => ({
        code: result.item.code,
        description: result.item.description,
        relevance: calculateRelevance(result.score)
    }));
}

function getSniCodeDetails(code) {
    if (typeof code !== 'string') {
        throw new Error('SNI code must be a string');
    }
    return sniCodes.find(sni => sni.code === code.trim()) || null;
}

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function autocomplete(keyword) {
    if (!keyword || typeof keyword !== 'string' || keyword.trim().length < 2) {
        return []; // Return early if keyword is empty or too short
    }

    const lowerKeyword = keyword.trim().toLowerCase();
    return sniCodes
        .filter(sni => sni.description.toLowerCase().startsWith(lowerKeyword))
        .slice(0, 5)  // Limit suggestions to 5 items
        .map(sni => sni.description);
}

// Wrap the autocomplete function with debounce (e.g., 300ms delay)
const debouncedAutocomplete = debounce(autocomplete, 300);

module.exports = {
    validateSniCode,
    searchSniCodes,
    getSniCodeDetails,
    autocomplete,
    debouncedAutocomplete
};

console.log(searchSniCodes('Data'));
