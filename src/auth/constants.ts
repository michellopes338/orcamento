import * as fs from 'fs';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

export const jwtConstants = {
  privateKey: {
    key: fs.readFileSync(path.resolve(__dirname, '../keys/private.key')),
    passphrase: process.env.PASSPHRASE,
  },
  publicKey: fs.readFileSync(path.resolve(__dirname, '../keys/public.pem')),
};
