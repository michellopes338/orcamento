import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
// import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { Public } from './roles/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() request: any) {
    return this.authService.generateToken(request.user);
  }
}
