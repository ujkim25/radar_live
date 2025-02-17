import { Body, Controller, Get, Post, Query, Redirect, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { HandlebarsService } from './handlebars.service';

@Controller('handlebars')
export class HandlebarsController {
    constructor(private handlebarsService: HandlebarsService) {}

    // 1) UI 페이지 렌더링 (Handlebars)
    // GET /handlebars
    /*
    @Get()
    @Render('handlebars')// handlebars.hbs
    showHandlebars() {
        const data = this.handlebarsService.getData();
        return {
            title: 'Handlebars Page',
            data,
        };
    }
    */

    @Get()
    @Render('handlebars') // 메서드가 반환하는 객체를 Handlebars 템플릿에 전달하여 렌더링하라는 의미
    showHandlebars(@Query('query') query?: string) {
        /*
        예를 들어, URL이 /handlebars?query=something이면, query 변수에는 "something"이 들어갑니다.
        물음표(?)는 이 매개변수가 선택적(optional)임을 의미하며, 값이 없으면 undefined가 됩니다.
        */
        const data = query ? this.handlebarsService.searchData(query) : this.handlebarsService.getData();
        // 만약 검색어(query)가 있다면 검색 결과를 보여주고, 없으면 전체 데이터를 보여준다.
        return {
            title: 'Handlebars Page',
            data: data,
            searchQuery: query || '', // 검색창에 현재 검색어를 표시하기 위해. 만약 query가 없으면 빈 문자열('')이 전달됩니다.
        }
    }

    /*
    @Post()
    @Redirect('/handlebars')
    postData(@Body() body: {newData: string}) {// 파라미터로 전달되는 값이 객체여야 하기 때문에 {}를 붙인다. 
        // 컨트롤러 메서드에 인자로 넘겨주려면 파라미터 데코레이터가 필요합니다.
        // @Body() 데코레이터를 사용하면, NestJS가 파싱한 req.body 내용을 해당 파라미터로 주입(injection)해 줍니다.
        // NestJS에서 Request Body를 받으려면 @Body() 데코레이터가 필수입니다.
        this.handlebarsService.postData(body.newData);

        return {message: 'Item added via form', items: this.handlebarsService.getData()};
        // NestJS에서 컨트롤러가 객체를 반환하면, 기본적으로 JSON 형태로 직렬화되어 클라이언트에 응답합니다.
    }
    */

    @Post()
    postData(@Body() body: {newData: string}, @Res() res: Response) {
        /*
        @Res()를 사용하여 Express의 Response 객체를 직접 다루고 있기 때문에, 
        NestJS의 자동 렌더링 기능이 비활성화되고, 에러 상황이나 리다이렉션을 직접 처리해야 함
        */
        try {
            this.handlebarsService.postData(body.newData);
            return res.redirect('/handlebars');
        } catch (error) {
            return res.render('handlebars', {
                title: 'Handlebars Page',
                data: this.handlebarsService.getData(),
                errorMessage: error.message,
            });
        }
    }

    @Post('delete')
    @Redirect('/handlebars')
    deleteData(@Body() body: {deleteData: string}) {
        this.handlebarsService.deleteData(body.deleteData);
        return {message: 'Item deleted', items: this.handlebarsService.getData()};
    }

    @Post('update')
    @Redirect('/handlebars')
    updateData(@Body() body: {oldData: string, newData: string}) {
        this.handlebarsService.updateData(body.oldData, body.newData);
        return {message: 'Item updated', items: this.handlebarsService.getData()}
    }
}
