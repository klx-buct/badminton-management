import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../../common/data/response';
import { Observable } from 'rxjs';

@Injectable()
export class MatchService {

  constructor(
    private http: HttpClient
  ) { }

  insertMatch(match: any): Observable<Response> {
    return this.http.post<Response>("api/match/add", match);
  }

  updateMatch(match: any): Observable<Response> {
    return this.http.post<Response>("api/match/updateMatch", match);
  }

  getType(): Observable<Response> {
    return this.http.get<Response>("api/type/list");
  }

  getMatchList(status: number, pageSize: number, pageIndex:number, keywords: string = ""): Observable<Response> {
    return this.http.get<Response>(`api/match/list?status=${status}&pageSize=${pageSize}&pageIndex=${pageIndex}&keywords=${keywords}`);
  }

  getMatchById(id: number): Observable<Response> {
    return  this.http.get<Response>(`api/match/detail?id=${id}`);
  }

  getArrange() {
    return this.http.get("api/arrange/list");
  }

  getConfrontation(matchId: number) {
    return this.http.get(`api/arrange/confrontation?matchId=${matchId}`);
  }

  auto(matchId: number, address: String, sort: number, roundName: String): Observable<Response> {
    return this.http.get<Response>(`api/arrange/auto?matchId=${matchId}&address=${address}&sort=${sort}&roundName=${roundName}`);
  }

  getRound(matchId: number): Observable<Response> {
    return this.http.get<Response>(`api/match/round?matchId=${matchId}`);
  }

  prizeList(): Observable<Response> {
    return this.http.get<Response>(`api/match/prizeList`);
  }

  end(matchId: number): Observable<Response> {
    const params = {
      matchId
    }
    return this.http.post<Response>(`api/match/end`, params);
  }

}
