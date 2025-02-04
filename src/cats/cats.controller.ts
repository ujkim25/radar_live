import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from 'src/cats/interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {} //The CatsService is injected through the class constructor.

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get() //이 메서드를 HTTP GET 요청에 매핑한다는 뜻
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }
    /*
     데이터베이스 쿼리, 파일 읽기/쓰기, HTTP 통신 등의 작업은 대부분 비동기가 됩니다.
    따라서 NestJS의 서비스 계층(this.catsService.findAll())이 이러한 비동기 로직(예: DB 접근)을 포함할 가능성이 매우 높습니다.
    NestJS에서 비동기 함수는 주로 async/await 형태로 작성합니다.
    async로 선언된 함수가 반환하는 값은 자동으로 Promise가 됩니다
    */

    @Put(':id') //PUT /cats/1처럼 ID를 받아 처리할 수 있습니다.
    update(): string {
        return 'Put /cats/:id -> This action updates a cat';
    }
}
