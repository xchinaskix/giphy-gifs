import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class GifService {
    public API_KEY = '0DcaXmTipxIqnyKtr4nszyW1GdgsKBZQ';
    public HOST = 'https://api.giphy.com';
    public UPLOAD = 'https://upload.giphy.com';
    public favoritesListId = [];
    public favorites = [];
    public main = [];
    public amount = 75;
    public lgn: number;
    public currSearch = 'gif';
    public pending = false;
    public isAuth = false;
    public progress = new Subject();
    public isLoading = new BehaviorSubject(false);

    constructor(public http: HttpClient) {}


    getRandomGifs(): Observable<any> {
        const param = new HttpParams().set('api_key', this.API_KEY);
        return this.http.get(`${this.HOST}/v1/gifs/random`, {params: param});
    }

    getSearchGifs(search: string) {
        this.amount = 75;
        this.pending = true;
        this.currSearch = search === '' ? 'gif' : search;
        let params = new HttpParams();
        params = params.append('api_key', this.API_KEY);
        params = params.append('q', this.currSearch);
        params = params.append('limit', `${this.amount}`);
        this.http.get(`${this.HOST}/v1/gifs/search`, {params: params})
        .subscribe(res => {
            this.pending = false;
            this.main = res['data'];
            this.lgn = this.main.length;
        });
    }


    getSearchWithParam() {
        this.amount += 50;
        this.pending = true;
        let params = new HttpParams();
        params = params.append('api_key', this.API_KEY);
        params = params.append('q', this.currSearch);
        params = params.append('limit', `${this.amount}`);
        this.http.get(`${this.HOST}/v1/gifs/search`, {params: params})
        .subscribe(res => {
            this.pending = false;
            const newElem = res['data'].slice(this.lgn);
            this.main = [...this.main, ...newElem];
            this.lgn = this.main.length;
        });
    }

    getGifsByIds() {
        const ids = this.favoritesListId.join();
        let params = new HttpParams();
        params = params.append('api_key', this.API_KEY);
        params = params.append('ids', ids);
        this.http.get(`${this.HOST}/v1/gifs`, {params: params})
        .subscribe(res => {
            this.favorites = res['data'];
        });
    }

    addFavorites(id: string) {
        this.favoritesListId.push(id);
        this.updateFavoritesStorage();
    }

    removeFavorites(id: string) {
        this.favoritesListId = this.favoritesListId.filter(v => v !== id);
        this.favorites = this.favorites.filter(v => v.id !== id);
        this.updateFavoritesStorage();
    }

    getFavorites() {
        return this.favorites.slice();
    }

    checkGifInFavorites(id: string) {
        const pos = this.favoritesListId.indexOf(id);
        return pos === -1 ? false : true;
    }

    getFavoritesFromStorage() {
        const fav = JSON.parse(localStorage.getItem('giphyUser'));
        this.favoritesListId = [...fav['favorites']] ;
    }

    uploadGif(obj): Promise<any> {
            this.isLoading.next(true);
            const promise = new Promise<any>((resolve, reject) => {
                const url = `${this.UPLOAD}/v1/gifs?api_key=${this.API_KEY}&tags=${obj.tagName}`;
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                xhr.responseType = 'json';
                xhr.open('POST', url, true);
                xhr.addEventListener('readystatechange', (e) => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this.isLoading.next(false);
                        resolve(xhr.response);
                    } else if (xhr.readyState === 4 && xhr.status !== 200) {
                        this.isLoading.next(false);
                        reject();
                    }
                });

                xhr.upload.onprogress = (event) => {
                    const percentDone = Math.round(100 * event.loaded / event.total);
                    this.progress.next(percentDone);
                };

                formData.append('file', obj.file);

                xhr.send(formData);
            });
            return promise;
    }

    updateFavoritesStorage() {
        const storage = JSON.parse(localStorage.getItem('giphyUser'));
        storage['favorites'] = [...this.favoritesListId];
        localStorage.setItem('giphyUser', JSON.stringify(storage));
    }

    setAuth(val: boolean) {
        this.isAuth = val;
    }
}
