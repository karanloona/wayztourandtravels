import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO, LoginDTO, PasswordDTO } from "./auth.dto";
import { AuthDao } from "./auth.dao";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly authDao: AuthDao, private jwtService: JwtService) {}

    async createUser(dto:CreateUserDTO) {
        const res = await this.authDao.createUser(dto);
        return res;
    }

    async validateUser(username:string, password:string) {
        return await this.authDao.validateUser(username, password);
    }

    async loginUser(username:string) {
        const res = await this.authDao.loginUser(username);
        if (res instanceof Error) {
            return {
                error: 'No user Found'
            }
        } else {
            // Handle the case when a valid user object is returned
            return {
                access_token: this.jwtService.sign(res),
            };
        }
    }

    async changePassword(dto: PasswordDTO) {
        return await this.authDao.changePassword(dto);
    }
}