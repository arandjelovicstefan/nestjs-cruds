import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './user-dtos/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  //klasicna sintaksa za typeorm repository
  //usersRepo - ime repozitorijuma, kazemo da ce usersRepo da bude instanca od Repository koja ce da sadrzi objekte kao sto je User
  //injectRepo je obavezan zbog dependency injection jer koristimo genericki tip

  create(user: CreateUserDTO) {
    const createUser = this.usersRepository.create(user); // sa create pravimo novu instancu entiteta u bazi dok sa save cuvamo
    return this.usersRepository.save(createUser);
  }
}
