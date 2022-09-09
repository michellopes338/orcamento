import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, passwd: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && bcrypt.compare(passwd, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async generateToken(user: User) {
    const payload = {
      username: user.email,
      sub: user.id,
      is_superuser: user.is_superuser,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
