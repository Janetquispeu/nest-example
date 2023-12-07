import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  user: any;
  counter: number;
  constructor(private readonly appService: AppService) {
    this.counter = 0;
    this.user = [
      {
        id: 1,
        name: "1",
        code: '1'
      },
      {
        id: 2,
        name: "2",
        code: '2'
      },
      {
        id: 3,
        name: "3",
        code: '3'
      }
    ]
  }

  @Get('/api/users')
  getUsers(): string {
    return this.user;
  }

  @Get('/api/users/:id')
  getUsersById(@Param('id') id): string {
    const filter = this.user.find(item => item.id === Number(id));
    console.log(filter, 'filter')
    return filter;
  }

  @Post('/api/users')
  addUser(@Body() userData: any): any {
    const { name, code } = userData;
    if (!name || !code) {
      throw new BadRequestException('Invalid data')
    }

    // const lastId = this.user[this.user.length - 1].id + 1;
    
    // userData.id = lastId;
    const newUser = {
      id: this.counter,
      name,
      code
    };
    
    this.counter++;
    this.user.push(newUser);
    return this.user;
  }

  @Get('/api/pokemon')
  async getPokemos(): Promise<any> {
    const  {data} = await firstValueFrom(
      await this.appService.getPokemonByName('ditto')
    )

    return data;
  }
}
