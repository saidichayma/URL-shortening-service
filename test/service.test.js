const { expect } = require("expect"); 

const { generateId, isUrl } = require("../services/backService"); 

test('isUrl', () => {
    // Test if a valid URL is correctly recognized as valid.
    expect(isUrl("http://www.google.com")).toBeTruthy();
});

test('isNotUrl', () => {
    // Test if an invalid URL is correctly recognized as invalid.
    expect(isUrl("httpwwwgooglecom")).toBeFalsy();
});

test('Generate Id', () => {
    // Test if the generateId function returns a string of exactly 6 characters.
    expect(generateId()).toHaveLength(6);
});
