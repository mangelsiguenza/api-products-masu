export const streamToString = (stream: any, encoding?: BufferEncoding) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () =>
      resolve(
        encoding
          ? Buffer.concat(chunks).toString(encoding)
          : Buffer.concat(chunks).toString(),
      ),
    );
  });
