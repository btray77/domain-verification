const dns = require('dns');
const crypto = require('crypto');

/**
 * Generates a verification code and formats it according to the specified pattern.
 * @param {string} domain - The domain to be verified.
 * @param {string} [businessName=''] - The optional business name for the verification string.
 * @param {string} [format='{{businessName}}-domain-verification={{code}}'] - Custom format string with placeholders for businessName and code.
 * @param {Function} [callback] - Optional callback for Node.js callback style.
 * @returns {Promise|void} - Promise if no callback is provided, otherwise uses the callback.
 */
function generateVerificationCode(
  domain,
  businessName = '',
  format = '{{businessName}}-domain-verification={{code}}',
  callback
) {
  const code = crypto.randomBytes(16).toString('hex');
  const formattedString = format
    .replace('{{businessName}}', businessName)
    .replace('{{code}}', code);

  const result = {
    code,
    formattedString,
    instructions: `Please add the following TXT record to your DNS settings for the domain ${domain}: ${formattedString}`,
  };

  if (typeof callback === 'function') {
    callback(null, result);
    return;
  }

  return Promise.resolve(result);
}

/**
 * Verifies if the provided domain has a DNS TXT record matching the expected verification string.
 * @param {string} domain - The domain to verify.
 * @param {string} verificationString - The verification string expected to be found in DNS TXT records.
 * @param {Function} [callback] - Optional callback for Node.js callback style.
 * @returns {Promise<boolean>|void} - Promise resolving to a boolean if no callback is provided, otherwise uses the callback.
 */
function verifyDomain(domain, verificationString, callback) {
  const promise = new Promise((resolve, reject) => {
    dns.resolveTxt(domain, (err, records) => {
      if (err) {
        reject(
          new Error(
            `Failed to resolve DNS TXT records for ${domain}: ${err.message}`
          )
        );
        return;
      }

      const recordFound = records.some((recordArray) =>
        recordArray.some((record) => record === verificationString)
      );

      resolve(recordFound);
    });
  });

  if (typeof callback === 'function') {
    promise
      .then((result) => callback(null, result))
      .catch((err) => callback(err, null));
    return;
  }

  return promise;
}

module.exports = { generateVerificationCode, verifyDomain };
