const { expect } = require("expect"); 
const { generateId } = require("../services/backService"); 

test('Get Short URL', async () => {
    // Send a POST request to create a shortened URL.
    const create = await fetch('http://localhost:8081/shorten', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            longUrl: "https://www.example.com/" + generateId() // Generate a unique test URL.
        })
    }).then(data => data.json());

    // Send a GET request to the shortened URL and check if it redirects (302).
    const header = await fetch(create.shortUrl, { redirect: "manual" });
    expect(header.status).toBe(302); // Expect a 302 status (redirect).
});

test('Invalid Short URL', async () => {
   
    const header = await fetch('http://localhost:8081/unvalid');
    expect(header.status).toBe(404); // Expect a 404 Not Found status.
});

test('Invalid URL', async () => {
    // Send an invalid URL to the API and expect a 400 Bad Request response.
    const header = await fetch('http://localhost:8081/shorten', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            longUrl: "httpwwwexamplecom" + generateId() 
        })
    });
    expect(header.status).toBe(400); 
});

test('Create Url', async () => {
    // Create a valid shortened URL and expect a 201 Created response.
    const header = await fetch('http://localhost:8081/shorten', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            longUrl: "https://www.example.com/" + generateId() + "/" + generateId() 
        })
    });
    expect(header.status).toBe(201); 
});

test('URL already exists', async () => {

    const dummyId = generateId();

    // Define a function to send a POST request to create a shortened URL.
    const createUrl = async () => await fetch('http://localhost:8081/shorten', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            longUrl: "https://www.example.com/" + dummyId 
        })
    });

    await createUrl(); 
    const header = await createUrl(); 
    
    expect(header.status).toBe(208); // Expect a 208 Already Reported status.
});
