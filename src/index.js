const sniCodes = require('./sni_codes.json');
const createFuseInstance = require('./fuse');

const fuse = createFuseInstance(sniCodes);

// Cache for search results
const searchCache = new Map();
const keywordIndex = {};

// Build an index for faster keyword searches
function buildKeywordIndex() {
    sniCodes.forEach(sni => {
        const words = sni.description.toLowerCase().split(' ');
        words.forEach(word => {
            if (!keywordIndex[word]) {
                keywordIndex[word] = [];
            }
            keywordIndex[word].push(sni);
        });
    });
}

// Initialize the keyword index
buildKeywordIndex();

function searchWithIndex(keyword) {
    const lowerKeyword = keyword.trim().toLowerCase();
    return keywordIndex[lowerKeyword] || [];
}

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
        return [];
    }

    const trimmedKeyword = keyword.trim().toLowerCase();

    if (searchCache.has(trimmedKeyword)) {
        return searchCache.get(trimmedKeyword);
    }

    const indexedResults = searchWithIndex(trimmedKeyword);

    if (indexedResults.length > 0) {
        const results = indexedResults.map(sni => ({
            code: sni.code,
            description: sni.description,
            relevance: '100'  // Exact match from index
        }));

        // Cache the result
        searchCache.set(trimmedKeyword, results);
        return results;
    }

    // Fallback to Fuse.js search if no index matches
    const fuseResults = fuse.search(trimmedKeyword);
    const results = fuseResults.map(result => ({
        code: result.item.code,
        description: result.item.description,
        relevance: calculateRelevance(result.score)
    }));

    searchCache.set(trimmedKeyword, results);
    return results;
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
        return [];
    }

    const lowerKeyword = keyword.trim().toLowerCase();
    const results = searchWithIndex(lowerKeyword).slice(0, 5);  // Limit suggestions to 5 items
    return results.map(sni => sni.description);
}

// Wrap autocomplete with debounce
const debouncedAutocomplete = debounce(autocomplete, 300);

module.exports = {
    validateSniCode,
    searchSniCodes,
    getSniCodeDetails,
    autocomplete,
    debouncedAutocomplete
};