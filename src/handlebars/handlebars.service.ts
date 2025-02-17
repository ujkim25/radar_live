import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class HandlebarsService {
    private data: string[] = [];
    
    postData(newData: string) {
        if (!newData.trim()){ 
            /*
            문자열의 앞뒤에 있는 공백 문자(스페이스, 탭, 줄바꿈 등)를 제거하고, 중간에 있는 공백은 제거하지 않습니다.
            newData.trim()이 빈 문자열("")이라면, JavaScript에서는 이것을 false로 평가합니다.
            */
            throw new Error('Cannot add empty item!');
        }

        this.data.push(newData);
    }

    getData() {
        return this.data;
    }

    deleteData(deleteData: string) {
        this.data = this.data.filter((d) => d !== deleteData);
    }
    /*
    filter()는 배열(Array)의 메서드로, 주어진 조건을 만족하는 요소만 남기고, 나머지는 제거하는 함수입니다.
    즉, 삭제할 항목을 제외한 새로운 배열을 만들어 this.data에 다시 할당하는 방식입니다.
    this.data 배열을 순회하면서 d !== deleteData 조건을 만족하는 요소만 남김
    결과적으로 deleteData과 일치하는 요소는 배열에서 제거됨
    */

    updateData(oldData: string, newData: string){
        const index = this.data.findIndex((u) => u === oldData);
        this.data[index] = newData;
    }

    searchData(query: string): string[] {
        const lowerQuery = query.toLowerCase();
        return this.data.filter(item => item.toLowerCase().includes(lowerQuery))
    }
}
