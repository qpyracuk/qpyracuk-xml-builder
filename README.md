# @qpyracuk/xml-builder

## Introduction

At work I needed to serialize large data structures in XML, at that time I thought that this was not a problem, because NPM has many ready-made and reliable solutions.
But to my great surprise, the search for the required library ended in failure.
We won’t point fingers, but... One library produced invalid XML, another broke on large data structures, a third did not understand what was happening at all, and so on.

I tried 7 of the most popular libraries, and absolutely every one of them disappointed me to one degree or another.

We must pay tribute to the developers of `xml2js`, because this is the only library that was able to at least create XML from a large data structure
(She made a little mistake on the arrays, but it was the best result among all)

But the problem with arrays is a small thing compared to the fact that data structures such as Set and Map crashed ANY library.

Therefore, I decided that it was time for another bike, and sat down to write my own XML serializer.

Fortunately, at this moment, I had my wonderful library [@qpyracuk/iterator](https://www.npmjs.com/package/@qpyracuk/iterator), which made my life much easier.
The iterator reliably traverses a data tree in depth and breadth and supports data structures such as Map and Set.
Therefore, making XML from this ready-made data is a task for 1 evening, with the help of 5 mugs of coffee.

And now, I am testing this library, and without any problems it converts huge data structures of millions of rows in a fraction of a second.
I won’t show off, but I decided to compare the serialization speed with other libraries and... I beat them all!!!
This concludes my long speech.

Use it, it's a really good solution!

## Installation

This is a JS library available through the npm registry.
Before installation, you need to download and install `Node.js`.
Requires `Node.js v8.0.0 or higher`.

If this is a completely new project, be sure to create a `package.json` file using the npm init command.

To install the package, enter the `npm install @qpyracuk/xml-builder` command in the console.

```sh
npm install @qpyracuk/xml-builder
```

## Features

- Support for `Map` and `Set` data structures;
- Pretty output mode;
- Adjusting tab size in pretty mode;
- Displaying variable `types` in XML attributes;
- High serialization speed;
- Disabling the XML preamble `<?xml ...?>`;
- Changing the encoding.

## Quick Start

After installing the package, import the library.

For ESMAScript modules:

```js
import XML from '@qpyracuk/xml-builder';
```

For CommonJS modules:

```js
const XML = require('@qpyracuk/xml-builder');
```

### Usage example

#### We create an object that needs to be traversed

```js
const futureXML = {
  primitive: '1',
  object: {
    primitive: 3,
    array: ["1", 2, "three"],
    set: new Set([1, 2, new Map([['key', { field: { value: 100 } }]])]),
    map: new Map([['key', { value: 10 }]])
  }
};

const builder = XML.createBuilder({ pretty: true, typed: true, preamble: true });
const xml = builder.stringify(futureXML);
```

## Options

### pretty: `boolean`

XML output with tabs and line breaks.

### typed: `boolean`

Sign the type of fields of objects or variables.

### tab: `number | 'tab'`

Tab size in spaces if specified as a positive numeric value.
Is it possible to specify `'tab'` and then all whitespace characters will become `\t`.

### encoding: `string`

Encoding in XML preamble.

### preamble: `boolean`

Embed XML preamble.

## Builder methods

### stringify(data: any): `string`

Serializes data into XML.
Yes, it's simple!

## In conclusion

This is a very young library, and in the future I plan to create 3 additional libraries for:

- Parsing - `@qpyracuk/xml-parser`
- Validation - `@qpyracuk/xml-validator`
- Consolidation - `@qpyracuk/xml` (A set of utilities for working with ХML)

This will be done so that it is possible to use both all modules together and separately.

I assemble the topscript project so that the package is independent of the libraries, and is a ready-made bundle that can be used in the browser.

But in the project dependencies I specified “iterator”, because I really really want to increase the number of downloads on this library, now I’m the only one using it...

## Author

The author of the library is Pobedinskiy David.

## Bugs

If you encounter unexpected errors, please let me know.
By e-mail [qpyracuk@gmail.com](qpyracuk@gmail.com) or in [Telegram](https://t.me/qpyracuk).

## Support the author

If my work has helped you make your life easier, you can support me with your donations.

[Boosty](https://boosty.to/qpyracuk)

[Patreon](https://patreon.com/qpyracuk)

Search npm for other libraries with the @qpyracuk prefix. Perhaps you will find something useful for your project.
