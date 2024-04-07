const { generateVerificationCode, verifyDomain } = require('./index');

async function verifyDomainOwnership() {
  const domain = 'yourwebsite.com';
  const businessName = 'yourbusinessname'; //alphanumeric only
  const format = '{{businessName}}-domain-verification={{code}}'; // Assuming this is your desired format
  const wantedCode = 'asdf1234asdf1234asdf1234asdf1234asdf1234'; // hardcoded code for demo.

  try {
    // Generate the code and instructions for the user
    const result = await generateVerificationCode(domain, businessName, format);
    console.log(result.instructions); // Logs the instructions with the generated code

    // Assuming you want to use the generated code for verification,
    // but you have 'openAicode' hardcoded. Adjust as necessary.
    // If 'openAicode' is what you're verifying, you need the full expected string:
    //const verificationString = `${businessName}-domain-verification=${result.code}`;
    const verificationString = `${businessName}-domain-verification=${wantedCode}`;
    // OR if you're using a hardcoded 'openAicode', construct it like so:
    // const verificationString = `${businessName}-domain-verification=${openAicode}`;

    // Later, after the user has added the TXT record to their DNS
    const isVerified = await verifyDomain(domain, verificationString);
    console.log(
      isVerified ? 'Verification successful.' : 'Verification failed.'
    );
  } catch (error) {
    console.error('Error during verification:', error.message);
  }
}

verifyDomainOwnership();
