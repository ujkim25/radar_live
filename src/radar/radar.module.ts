import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RadarController } from './radar.controller';
import { RadarService } from './radar.service';

@Module({
  imports: [HttpModule], // 외부 API 호출을 위해 HttpModule 사용
  controllers: [RadarController],
  providers: [RadarService],
})
export class RadarModule {}

/*
각 도메인 모듈 내부에는 해당 도메인에 필요한 Controller, Service, Repository 등을 선언
보통은 **루트 모듈(AppModule)**에서 도메인 모듈(RadarModule 등)을 import하지, 도메인 모듈 쪽에서 AppModule이나 AppController를 import하지 않습니다.
즉, **radar.module.ts**에서는 당연히 **app.module.ts나 app.controller.ts**를 import할 일이 보통 없습니다.
*/