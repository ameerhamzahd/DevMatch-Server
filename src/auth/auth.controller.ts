import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        const createdUser = await this.authService.registerUser(registerUserDto);

        return createdUser;
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const loggedInUser = await this.authService.loginUser(loginUserDto);

        return loggedInUser;
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const userID = req.user.sub;

        const user = await this.userService.getUser(userID);

        return user;
    }
}
