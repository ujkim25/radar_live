import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cat.interface';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
        this.cats.push(cat);
    }

    findOne(): Cat {
        return this.cat;
    }

    findAll(): Cat[] {
        return this.cats;
    }
}
