const { DateTime } = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter('readablePostDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
            zone: 'Pacific/Auckland',
        }).setLocale('en-NZ').toLocaleString(DateTime.DATE_FULL);
    });

    eleventyConfig.addFilter('postDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
            zone: 'Pacific/Auckland',
        }).setLocale('en-NZ').toISODate();
    });

    eleventyConfig.dir = {
        input: './',
        output: './_site',
        includes: '_includes',
        layouts: '_layouts',
    };

    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPassthroughCopy('img');

    return eleventyConfig;
  };