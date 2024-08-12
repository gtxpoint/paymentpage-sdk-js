const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const encoding = 'base64';
const keyLength = 32;
const keyDefault = crypto.randomBytes(keyLength);

module.exports = (url, encryptKey = keyDefault) => {
  const key = Buffer.from(encryptKey.padEnd(keyLength, '\0'));
  const iv = crypto.randomBytes(keyLength / 2);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(url, 'utf8', encoding);
  encrypted += cipher.final(encoding);

  let encryptedData = `${encrypted.toString('hex')}::${Buffer.from(iv).toString(encoding)}`;
  encryptedData = Buffer.from(encryptedData).toString(encoding);

  return {
    iv: iv.toString('hex'),
    encryptedData,
  };
};
