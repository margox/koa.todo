'use strict';

module.exports = {
    guid: function () {
        var id = 0;
        return function () {
            id++;
            return new Date * 1 + '_' + id;
        }
    }()
};
