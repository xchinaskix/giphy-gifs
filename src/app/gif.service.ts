import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class GifService {
    public API_KEY = '0DcaXmTipxIqnyKtr4nszyW1GdgsKBZQ';
    public HOST = 'api.giphy.com';
    public favorites = [];

    constructor(public http: HttpClient) { }

    getRandomGifs(): Observable<any> {
        const param = new HttpParams().set('api_key', this.API_KEY);
        return this.http.get(`https://${this.HOST}/v1/gifs/random`, {params: param});
    }

    getSearchGifs(search: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('api_key', this.API_KEY);
        params = params.append('q', search);
        return this.http.get(`https://${this.HOST}/v1/gifs/search`, {params: params});
    }

    getSearchWithParam(search: string, amount: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('api_key', this.API_KEY);
        params = params.append('q', search);
        params = params.append('limit', amount);
        return this.http.get(`https://${this.HOST}/v1/gifs/search`, {params: params});
    }

    getGifsByIds(): Observable<any> {
        const ids = this.favorites.join();
        let params = new HttpParams();
        params = params.append('api_key', this.API_KEY);
        params = params.append('ids', ids);
        return this.http.get(`https://${this.HOST}/v1/gifs`, {params: params});
    }

    addFavorites(id: string) {
        this.favorites.push(id);
    }

    removeFavorites(id: string) {
        this.favorites = this.favorites.filter(v => v !== id);
    }

    getFavorites() {
        return this.favorites.slice();
    }


    checkGifInFavorites(id: string) {
        const pos = this.favorites.indexOf(id);
        return pos === -1 ? false : true;
    }
}
