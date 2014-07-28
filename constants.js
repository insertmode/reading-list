var stylusConstants = require('./const.js.styl'); 
stylusConstants =  stylusConstants
    .replace(/^exports/,'')
    .replace(/(\w+):/g, 
        function(a,b,c) {
            return '"' + b + '":';
        }
    )
    .replace(/";"/, '","'); 

module.exports = JSON.parse(stylusConstants);
