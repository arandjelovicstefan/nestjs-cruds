import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDTO } from './user-dtos/create-user.dto';
import { UpdateUserDTO } from './user-dtos/update-user.dto';
import { UserDTO } from './user-dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDTO) // importujemo dekorator na celom kontroleru
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    //koristimo Body dekorator da kazemo nestjs-u da zelimo da extract-ujemo body iz request-a
    this.usersService.create(body);
  }

  //@UseInterceptors(ClassSerializerInterceptor) // kazemo da prilikom get requesta koristi interceptore i prosledjujemo mu koje
  // @Serialize(UserDTO)
  @Get('/:id')
  //kada se parsuje bilo koji deo iz url-a, iako je broj iz url-a uvek dolazi kao string !!
  async findUser(@Param('id') id: 'string') {
    // console.log('Handler is running');
    //parseInt konvertuje string u integer
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  //koristimo query dekorator jer ocekujemo da se getuju useri sa query parametrom
  //npr: auth?email=asd@gmail.com
  // @Serialize(UserDTO)
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
