# Domain Verification

This package provides tools for verifying domain ownership through DNS TXT records. It supports customizable verification string formats and offers both callback and promise-based asynchronous interfaces.

## Key Features

- Generate DNS TXT record verification strings with customizable formats.
- Verify domain ownership by checking for specific DNS TXT records.
- Supports both callback and promise-based asynchronous patterns.

## Installation

Install the package using npm:

```
npm install txt-domain-verification
```

## Usage

### Generating a Verification Code

Generate a verification code with an optional custom format.
By default, the format is `{{businessName}}-domain-verification={{code}}`.

```
const { generateVerificationCode } = require('txt-domain-verification');

generateVerificationCode('example.com', 'mybusiness', '{{businessName}}-verification={{code}}', (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result.instructions);
});
```

### Verifying Domain Ownership

Verify if a domain has the expected DNS TXT record.

```
const { verifyDomain } = require('txt-domain-verification');

verifyDomain('example.com', 'mybusiness-verification=123abc', (err, isVerified) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(isVerified ? 'Verification successful.' : 'Verification failed.');
});
```

## API Reference

### `generateVerificationCode(domain, [businessName], [format], [callback])`

Generates a verification code and instruction for a DNS TXT record.

- `domain`: The domain to be verified.
- `businessName`: (Optional) Your business name, can be omitted.
- `format`: (Optional) Custom format string with placeholders `{{businessName}}` and `{{code}}`. If not provided, a default format will be used.
- `callback`: (Optional) Use for a callback pattern. If not provided, a promise will be returned.

### `verifyDomain(domain, verificationString, [callback])`

Verifies the domain ownership by checking DNS TXT records.

- `domain`: The domain to verify.
- `verificationString`: The exact verification string expected to be found in DNS TXT records.
- `callback`: (Optional) Use for a callback pattern.

## Examples

### Using `require` in Node.js

```
const { generateVerificationCode, verifyDomain } = require('txt-domain-verification');

// Generate a verification code
generateVerificationCode('example.com', 'mybusiness', '{{businessName}}-verification={{code}}', (err, result) => {
  if (err) {
    console.error('Error generating verification code:', err);
    return;
  }
  console.log('Verification code generated:', result.instructions);
});

// Later, to verify the domain
verifyDomain('example.com', 'mybusiness-verification=123abc', (err, isVerified) => {
  if (err) {
    console.error('Error verifying domain:', err);
    return;
  }
  console.log(isVerified ? 'Verification successful.' : 'Verification failed.');
});
```

### Using `import` in ES Modules

For environments that support ES Modules, you can import the package as follows:

```
import { generateVerificationCode, verifyDomain } from 'txt-domain-verification';

// Generate a verification code
generateVerificationCode('example.com', 'mybusiness', '{{businessName}}-verification={{code}}')
  .then(result => {
    console.log('Verification code generated:', result.instructions);
  })
  .catch(err => {
    console.error('Error generating verification code:', err);
  });

// Later, to verify the domain
verifyDomain('example.com', 'mybusiness-verification=123abc')
  .then(isVerified => {
    console.log(isVerified ? 'Verification successful.' : 'Verification failed.');
  })
  .catch(err => {
    console.error('Error verifying domain:', err);
  });
```

## Testing

This package includes a Jest test suite to ensure functionality works as expected. To run the tests, first install the package's development dependencies:

`npm install`

Then run the test suite with:

`npm test`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements.

## License

This project is licensed under the CC BY-SA License.
