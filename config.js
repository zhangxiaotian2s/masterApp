const PAGE_DATA = {
    ROOT_API: 'https://api.mastergolf.cn/',
    API:{
        //登陆
        LOGIN:'/v10/user/sessions/third_party_login_wechat_app.json',
        CHECKLOGIN:'/v10/user/sessions/check_login.json',
         //newmedia
        NEWSLIST: 'v1/news/articles/list.json',
        NEWSCONTENT: 'v1/news/articles/show.json',
        ADDCOMMENT:'v1/news/comments/add_comment.json',
        COMMENTS:'v1/news/comments/list.json',
        SEARCHNEWS:'v1/news/articles/search_article.json'
    }

}

export { PAGE_DATA }