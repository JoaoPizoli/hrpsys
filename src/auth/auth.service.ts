import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

type AuthInput = { username: string; password: string }
type SingInData = { userId: number; username: string; }
type AuthResult = { acessToken: string; userId: number; username: string }

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}

    async authenticate(input : AuthInput): Promise<AuthResult>{
        const user = await this.validateUser(input)

        if(!user) {
            throw new UnauthorizedException();
        }

        return this.signIn(user)
    }

    async validateUser(input: AuthInput): Promise<SingInData | null> {
        const user = await this.userService.findUserByName(input.username)

        if(user && user.password === input.password){
            return {
                userId: user.id,
                username: user.name
            }
        }
        return null
    }

    async signIn(user: SingInData): Promise<AuthResult> {
        const tokePayload = {
            sub: user.userId,
            username: user.username,
        }

        const acessToken = await this.jwtService.signAsync(tokePayload)

        return { acessToken, username: user.username, userId: user.userId }
    }
}
