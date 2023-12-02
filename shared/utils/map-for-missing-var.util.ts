import * as fs from 'fs';
import * as readline from 'readline';
import { hasVariable } from './has-variable.util';

export const mapForMissingVar = async (
  envExamplePath: string,
  Logger: any,
): Promise<void> => {
  const envExampleExists = fs.existsSync(envExamplePath);

  if (!envExampleExists) {
    Logger.error('No .env.example file found.');
    process.kill(process.pid, 'SIGINT');
    process.exit(0);
  }

  const fileStream = fs.createReadStream(envExamplePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const missingVars: string[] = [];

  for await (const line of rl) {
    if (line !== '' && !line.startsWith('#')) {
      if (!hasVariable(line)) {
        missingVars.push(line);
      }
    }
  }

  if (missingVars.length > 0) {
    Logger.error(`Missing variables: ${missingVars.join(', ')}`);
    process.kill(process.pid, 'SIGINT');
    process.exit(0);
  }
};
