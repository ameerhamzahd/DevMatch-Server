import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
    constructor(private readonly db: DatabaseService) { }

    // GET ALL
    async findAll() {
        const result = await this.db.query(
            'SELECT * FROM profiles ORDER BY id ASC',
        );

        return result.rows;
    }

    // GET ONE
    async findOne(id: number) {
        const result = await this.db.query(
            'SELECT * FROM profiles WHERE id = $1',
            [id],
        );

        if (result.rows.length === 0) {
            throw new NotFoundException('Profile not found');
        }

        return result.rows[0];
    }

    // CREATE
    async createProfile(createProfileDto: CreateProfileDto) {
        const { name, description } = createProfileDto;

        const result = await this.db.query(
            `
      INSERT INTO profiles(name, description)
      VALUES($1, $2)
      RETURNING *
      `,
            [name, description],
        );

        return result.rows[0];
    }

    // UPDATE
    async updateProfile(
        id: number,
        updateProfileDto: UpdateProfileDto,
    ) {
        const { name, description } = updateProfileDto;

        const result = await this.db.query(
            `
          UPDATE profiles
          SET
            name = COALESCE($1, name),
            description = COALESCE($2, description)
          WHERE id = $3
          RETURNING *
          `,
            [name, description, id],
        );

        if (result.rows.length === 0) {
            throw new NotFoundException('Profile not found');
        }

        return result.rows[0];
    }

    // DELETE
    async deleteProfile(id: number) {
        const result = await this.db.query(
            `
      DELETE FROM profiles
      WHERE id = $1
      RETURNING *
      `,
            [id],
        );

        if (result.rows.length === 0) {
            throw new NotFoundException('Profile not found');
        }

        return;
    }
}