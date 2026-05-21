import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async registerUser(registerUserDto: RegisterUserDto) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(registerUserDto.password, saltRounds);

        const user = await this.userService.createUser({ ...registerUserDto, password: hashedPassword });

        const payload = {
            sub: user.id,
            email: user.email
        }
        const token = await this.jwtService.signAsync(payload);

        return {
            user,
            access_token: token
        };
    }
}
