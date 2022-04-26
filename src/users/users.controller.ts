import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './user-dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    //koristimo Body dekorator da kazemo nestjs-u da zelimo da extract-ujemo body iz request-a
    this.usersService.create(body);
  }
}
