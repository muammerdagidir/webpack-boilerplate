const path = require('path');

module.exports = {
    root: path.resolve(__dirname, '../'),
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
    public: path.resolve(__dirname, '../public'),
    basename: (file, ext) => path.basename(file, ext),
    parse: (file) => path.parse(file)
};