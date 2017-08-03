## Set Up

## Clear the stage

Close down any editors, terminal tabs from the last exercise.

#### Objectives

- Gather user input with a form and send it to a server with a `POST` request
- Respond to `POST` requests from forms with a server
- Use a separate module to process user input and insert it into the response
- Use a templating package you are not familiar with

## Setup

Recall from the previous exercise that you can configure different templating languages when you create an express app.  Templating languages each have their benefits and drawbacks, and over time you'll get familiar with them.  For now, take a look at these three templating languages:

- http://jade-lang.com/
- https://github.com/barc/express-hbs
- https://www.npmjs.com/package/hjs
- https://mozilla.github.io/nunjucks/

Do you remember how to generate an express app?  Go to the command line and type `express --help` to see what options you have.

For this exercise, generate a new express app called `hipstafy`, and generate it using a different templating language than you used for the song-that-doesnt-end.  If you mess up the flags, just delete it and restart - no biggie.

Once it's generated, and you've CD'd into the project, be sure to run:

```
npm install
nodemon
```

You'll know it's done when all the tests pass.  

## Posting forms

When a browser makes a request to your Express app, you can pull data in multiple ways.  You've already been exposed to two of these:

- from path parameters (`/add/1/2` => `/add/:num1/:num2`)
- from query parameters (`/people?id=4&order=name`)

You can also access data passed up from HTML forms using `req.body`.  Consider that you have the following form:

```html
<form action="/foo/bar" method="post">
  <input type="text" name="level">
  <input type="text" name="emotion">
  <input type="submit">
</form>
```

When a user fills in the `emotion` field with the word "Happy", and the `level` field with "very" and submits the form, here's what happens:

- The browser makes an **HTTP request** to the path `/foo/bar`
- The browser gathers the form into the **HTTP request body**, which looks like this:

```
emotion=Happy&level=very
```
- Express uses _middleware_ (called `body-parser`) to parse the body and turn it into an object that looks like this:

```
{emotion: "Happy", level: "very"}
```

- Express looks for a place where you've defined a route for a `POST` to `/foo/bar`, which would look like this:

```js
router.post('/foo/bar', function (req, res, next) {

})
```

- That object, representing the parsed body, is available to you as `req.body`

```js
router.post('/foo/bar', function (req, res, next) {
  req.body // <= this will be {emotion: "Happy", level: "very"}
})
```

## Rules to memorize
(write these down)

- The `<form>`'s `action` matches the `path` in the route file
- The form's `method` matches the HTTP verb in the route file
- The the input's `name` attribute becomes the key in `req.body`
- The the input's value becomes the value in `req.body`

## Overview

Here are the project requirements:

1. Build a form that uses `textarea` and allows users to submit random sentences
![](wireframes/hipstafy.png)
1. Capture the user input with `req.body` and translate it into a 'hipstafied' response
1. Render the new hipstafied text to a template

### Setup the form

- Write an HTML form with an action/method that matches the path/verb in your `index.js`
- When the route is called, render a template

### Write the algorithm

`snippets.js` has several `hipster-ipsum` sentences in an array.

When you receive data from the user (in `req.body`), you should:

- Pick a random hipster snippet from `snippets.js`
- Split up the user input by spaces
- Add a random hipster snippet after every word

EXAMPLE:

If the user input was "Hey what's up??", your app would return this:

```
<p>Hey Portland Pug</p>
<p>what's mustache Intelligentsia</p>
<p>up?? Thundercats mullet</p>
```

NOTE: The user input was 3 words, so the function returned 3 hipster snippets mixed in with the 3 words the user input.

Remember that you'll have to use `require` to get access to those hipster snippets from your route :)
