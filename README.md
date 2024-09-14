# Sni-Codes-Utils

`sni-codes-utils` is an utility package for working with SNI (Svensk Näringsgrensindelning).

It provides fast search capabilities through an indexed search and fuzzy matching fallback using Fuse.js, along with functions for validating, searching, and retrieving SNI codes.

The package also includes support for debounced autocomplete.

## Features

- **Validate SNI Codes**: Easily check if an SNI code is valid.
- **Fast Search**: Search through SNI codes using an optimized keyword index.
- **Fuzzy Search**: When no exact match is found, Fuse.js provides a fuzzy search fallback.
- **Autocomplete**: Provides fast, debounced suggestions based on user input.
- **Cached Results**: Frequently searched terms are cached for improved performance.

## Installation

To install the package via npm, run:

```bash
npm install sni-codes-utils
```

## Usage

### Import the Module

```jsx
const {
  validateSniCode,
  searchSniCodes,
  getSniCodeDetails,
  autocomplete,
  debouncedAutocomplete
} = require('sni-codes-utils');
```

### Validate SNI Code

To check if a given SNI code exists:

```jsx
const isValid = validateSniCode('62010');
console.log(isValid); // true if valid, false otherwise
```

### Search SNI Codes

Search for SNI codes using a keyword. This uses an optimized keyword index and falls back to fuzzy search if necessary:

```jsx
const results = searchSniCodes('data');
console.log(results);
/*
[
  {
    code: '62010',
    description: 'Dataprogrammering',
    relevance: '99.90' // Relevance score based on search
  },
  ...
]
*/
```

### Get SNI Code Details

Retrieve detailed information for a specific SNI code:

```jsx
const details = getSniCodeDetails('62010');
console.log(details);
/*
{
  code: '62010',
  description: 'Dataprogrammering'
}
*/
```

### Autocomplete

Use the `autocomplete` function to provide real-time suggestions as the user types:

```jsx
const suggestions = autocomplete('data');
console.log(suggestions);
/*
[
  'Dataprogrammering',
  'Datakonsultverksamhet',
  ...
]
*/
```

### Debounced Autocomplete

You can also use the debounced version of `autocomplete` to handle rapid user input more efficiently:

```jsx

debouncedAutocomplete('data');
```

## Example

Here's a full example of how you can integrate the utility in your application:

```jsx

const {
  validateSniCode,
  searchSniCodes,
  getSniCodeDetails,
  autocomplete
} = require('sni-codes-utils');

// Validate a code
console.log(validateSniCode('62010')); // true

// Search for SNI codes with keyword
const searchResults = searchSniCodes('software');
console.log(searchResults);

// Get details of a specific SNI code
const details = getSniCodeDetails('62010');
console.log(details);

// Get autocomplete suggestions
const suggestions = autocomplete('data');
console.log(suggestions);
```

## Performance

- **Index-Based Search**: The package builds an index based on SNI descriptions for fast, exact keyword searches.
- **Fuse.js Fallback**: When no match is found in the index, the package falls back to Fuse.js, allowing for fuzzy searching.
- **Caching**: Frequently searched terms are cached for faster repeated lookups.

## License

This package is licensed under the MIT License.

---

## Keywords

- SNI Codes
- Svensk Näringsgrensindelning
- Business Classification
- Industry Codes
- Fuzzy Search
- Autocomplete
- Data Search
- Fuse.js
- Validate SNI Codes

Developed by [Fiive](https://fiive.se/)

