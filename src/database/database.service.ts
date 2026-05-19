import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit {
    private pool: Pool;

    constructor(private configService: ConfigService) {
        this.pool = new Pool({
            connectionString: this.configService.get<string>('DATABASE_URL'),
            ssl: {
                rejectUnauthorized: false,
            },
        });
    }

    async onModuleInit() {
        try {
            const client = await this.pool.connect();
            console.log('PostgreSQL Connected Successfully');
            client.release();
        } catch (error) {
            console.error('Database Connection Failed', error);
        }
    }

    async query(text: string, params?: any[]) {
        return this.pool.query(text, params);
    }
}