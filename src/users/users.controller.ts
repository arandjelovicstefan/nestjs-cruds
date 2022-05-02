import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './user-dtos/create-user.dto';
import { UpdateUserDTO } from './user-dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    //koristimo Body dekorator da kazemo nestjs-u da zelimo da extract-ujemo body iz request-a
    this.usersService.create(body);
  }

  //kada se parsuje bilo koji deo iz url-a, iako je broj iz url-a uvek dolazi kao string !!
  @UseInterceptors(ClassSerializerInterceptor) // kazemo da prilikom get requesta koristi interceptore i prosledjujemo mu koje
  @Get('/:id')
  async findUser(@Param('id') id: 'string') {
    //parseInt konvertuje string u integer
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  //koristimo query dekorator jer ocekujemo da se getuju useri sa query parametrom
  //npr: auth?email=asd@gmail.com
  @Get()
  findAllUsers(@Query('email') email?: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
