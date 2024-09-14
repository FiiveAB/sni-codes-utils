# sni-codes-utils

A npm package designed for working with Swedish SNI (Standard för Svensk Näringsgrensindelning) codes. This package simplifies the process of validating, searching, and retrieving SNI codes, making it ideal for platforms handling business classification, supplier management, or business descriptions in Sweden.

## Features

- **Validate** SNI codes to ensure they are correct.
- **Search** for SNI codes based on keywords or code numbers.
- **Retrieve** detailed information for specific SNI codes.
- Tailored for the Swedish market, focusing on the SNI classification system.
- Lightweight and fast, suitable for both small and large datasets.
- TypeScript support for enhanced type checking.

## Installation

```bash
npm install sni-codes-utils
```

## Usage

```jsx
const { validateSniCode, searchSniCodes, getSniCodeDetails } = require('sni-codes-utils');

// Validate an SNI code
const isValid = validateSniCode('62010');

// Search for SNI codes by keyword
const results = searchSniCodes('software');

// Get detailed information about a specific SNI code
const details = getSniCodeDetails('62010');

```

## Contributing

Contributions are welcome! Feel free to submit a Pull Request or open an issue to suggest improvements.

## License

MIT License


Developed by [Fiive](https://www.fiive.se)
