import { Role } from "src/user/types/user.types";
import {IsEmail, IsString} from "class-validator";

export class RegisterUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role?: Role = Role.User;
}