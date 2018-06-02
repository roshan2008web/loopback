'use strict';

module.exports = function(Campground) {
    Campground.validatesLengthOf('name', {max:25,message:{max: "Name is too long"}});
};
