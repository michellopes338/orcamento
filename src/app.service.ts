import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWorkingMessage(): string {
    return 'is working!';
  }
}
