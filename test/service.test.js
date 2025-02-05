const {expect} = require("expect");

const { generateId, isUrl } = require("../services/backService")

test('isUrl', () => {
    expect(isUrl("http://www.google.com")).toBeTruthy();
});

test('isNotUrl', () => {
    expect(isUrl("httpwwwgooglecom")).toBeFalsy();
});

test('Generate Id', () => {
    expect(generateId()).toHaveLength(6);
});