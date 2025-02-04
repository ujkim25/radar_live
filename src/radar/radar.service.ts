import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { RadarLiveResponse } from './radar.interface';
import { RadarRequestDto } from './radar.dto';

@Injectable()
export class RadarService {
  constructor(private readonly httpService: HttpService) {}

  async computeInsurance(data: RadarRequestDto): Promise<RadarLiveResponse> {
    // Radar Live API 문서에 따라, POST URL / 파라미터 / 헤더 설정
    const url = 'https://api.radar.live/v1/calculate-insurance';
    const headers = {
      Authorization: 'Bearer YOUR_RADAR_LIVE_API_KEY',
      'Content-Type': 'application/json'
    };

    // body에 data를 그대로 전송한다고 가정 (Radar Live가 요구하는 필드명에 맞춰 매핑해야 함)
    try {
      const response$ = this.httpService.post(url, data, { headers });
      //NestJS의 HttpService(구 @nestjs/axios)는 기본적으로 RxJS Observable을 반환합니다.
      //여기서 response$는 Observable 객체로, 아직 실제 네트워크 요청이 완료된 상태가 아닙니다.
      //RxJS Observable은 “스트림” 개념입니다. 요청이 완료된 시점에 **구독(subscribe)**하거나 toPromise 계열 함수를 써야 실제 데이터가 전달됩니다.
      const response = await lastValueFrom(response$);
      //lastValueFrom(response$)는 “이 Observable이 완료될 때(한 번의 응답이 온 뒤) 마지막 값을 Promise로 만들어 반환” 합니다.
      //즉, lastValueFrom을 통해 “Observable → Promise” 변환이 일어남.
      //변환된 Promise를 await로 처리하면, 실제 HTTP 응답(response.data)을 얻을 수 있게 됩니다.
      // response.data가 Radar Live가 주는 최종 계산 결과
      return response.data as RadarLiveResponse;
    } catch (error) {
      console.error('Error calling Radar Live API:', error);
      throw error;
    }
  }
}
