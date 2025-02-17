import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public')); // /public 디렉토리에 있는 정적 파일 제공 (이미지, CSS, JS 등)

  app.setBaseViewsDir(join(__dirname, '..', 'views')); // 뷰 템플릿 디렉토리 설정. 핸들바 템플릿 파일(.hbs)을 어디서 찾을지 지정

  app.setViewEngine('hbs'); // 템플릿 엔진: Handlebars

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
