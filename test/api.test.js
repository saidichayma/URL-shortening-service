const {expect} = require("expect");
const {generateId} = require("../services/backService");

test('Get Short URL', async () => {
    const create = await fetch('http://localhost:8081/shorten', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            longUrl: "https://www.example.com/" + generateId()
        })
    }).then(data => data.json());
    const header = await fetch(create.shortUrl, {redirect: "manual"});
    expect(header.status).toBe(302);
});

test('Invalid Short URL', async () => {
    const header = await fetch('http://localhost:8081/unvalid');
    expect(header.status).toBe(404);
});

test('Invalid URL', async () => {
    const header = await fetch('http://localhost:8081/shorten', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            longUrl: "httpwwwexamplecom" + generateId()
        })
    });
    expect(header.status).toBe(400);
});

test('Create Url', async () => {
    const header = await fetch('http://localhost:8081/shorten', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            longUrl: "https://www.example.com/" + generateId() + "/" + generateId()
        })
    });
    expect(header.status).toBe(201);
});

test('URL already exists', async () => {
    const dummyId = generateId();
    const createUrl = async () => await fetch('http://localhost:8081/shorten', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            longUrl: "https://www.example.com/" + dummyId
        })
    });
    await createUrl();
    const header = await createUrl();
    expect(header.status).toBe(208);
});