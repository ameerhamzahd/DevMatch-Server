import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
    constructor(private readonly db: DatabaseService) { }

    async createUser(registerUserDto: RegisterUserDto) {
        try {
            const { name, email, password, role } = registerUserDto;

            const result = await this.db.query(
                `
      INSERT INTO users(name, email, password, role)
      VALUES($1, $2, $3, COALESCE($4, 'user'))
      RETURNING id, name, email, role
      `,
                [name, email, password, role],
            );

            return result.rows[0];
        } catch (error: unknown) {
            console.log(error);

            const e = error as {code?: string};
            const DUPLICATE_KEY_CODE = "23505";

            if(e.code === DUPLICATE_KEY_CODE) {
                throw new ConflictException("Email is already taken.")
            }

            throw error;
        }
    }
}
