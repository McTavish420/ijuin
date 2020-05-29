import { Controller, Logger, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { GetSignUpToken } from './getSignupToken.decorator';
import { AuthSignUpCredentialsDto } from './dto/authSIgnUpCredentials.dto';
import { AuthPasswordResetDto } from './dto/authPasswordResetDto.dto';
import { AuthPasswordChangeDto } from './dto/authPasswordChangeDto.dto';
import { GetUser } from './getUser.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    private logger = new Logger('AuthController')
    constructor ( private authService: AuthService) {}

    @Post('/presignup')
    async preSignUp(@Body(ValidationPipe) authSignUpDTO: AuthSignUpCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.preSignUp(authSignUpDTO)
    }

    @Post('/signup')
    async signUp (@GetSignUpToken() token: string): Promise<void> {
        return this.authService.signUp(token)
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCredDTO: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredDTO)
    }

    @Post('/password/reset')
    async tryResetPassword(@Body(ValidationPipe) authResetPass: AuthPasswordResetDto): Promise<{ accessToken: string }> {
        return this.authService.tryResetPassword(authResetPass)
    }

    @Post('/password')
    async restPassword(@GetSignUpToken() token: string): Promise<void> {
        return this.authService.resetPassword(token)
    }

    @Post('/password/change')
    async changePassword (
        @Body(ValidationPipe) authPasswordChangeDTO: AuthPasswordChangeDto,
        @GetUser() token: string
    ): Promise<void> {
        return this.authService.changePassword(authPasswordChangeDTO, token)
    }
}
