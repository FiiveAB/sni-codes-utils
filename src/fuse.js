const Fuse = require('fuse.js');

const options = {
    keys: ['description'],
    threshold: 0.3,
    includeScore: true
};

function createFuseInstance(data) {
    return new Fuse(data, options);
}

module.exports = createFuseInstance;
