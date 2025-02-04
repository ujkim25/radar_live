import { Controller, Post, Body } from '@nestjs/common';
import { RadarService } from './radar.service';
import { RadarRequestDto } from './radar.dto';
import { RadarLiveResponse } from './radar.interface';

@Controller('radar')
export class RadarController {
  constructor(private readonly radarService: RadarService) {}

  @Post()
  async calculate(@Body() dto: RadarRequestDto): Promise<RadarLiveResponse> {
    // dto는 상사의 UI가 보낸 { gender, age, insuranceType } 등
    const result = await this.radarService.computeInsurance(dto);
    // 만약 **await**을 쓰지 않으면, computeInsurance()이 반환하는 Promise 객체만 받게 되고, 실제 결과값을 확인하기 위해서는 .then()이나 콜백으로 접근해야 합니다.
    // 여기서 result는 Radar Live API의 응답
    return result;
  }
}
