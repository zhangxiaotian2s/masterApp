import { PAGE_DATA } from '../../config.js';
import { API }       from '../data/newmedia.data.js';




class newsService  {
    constructor(){
        this.ROOT_API=PAGE_DATA.ROOT_API;
        this.API=API;
    };
     api(){
        return this._api=this.ROOT_API+this.API.NEWSLIST
    }
}
var  NewsService =new newsService();
console.log(NewsService.api())
export { NewsService }