# Why? 為什麼？
在寫網頁時不管使用原生或是前端框架，都會有一個網站的進入點，而要部屬到機器上時會使用到Web server像是Nginx或是Apache，而這個進入點會被使用者端的瀏覽器快取住，使得前端應用程式在更新版本之後，如果開發端不採取其他熱更新手段甚至放棄網站快取，則使用者必需清除網站的快取才能使用到最新的版本。

因此使用這個工具在每次部屬時執行Web server前，將進入點改為不一樣的名稱，並寫入Web server的設定檔，使執行Web server後使用者端拿到的進入點會與上一個應用程式版本不同而不會使用到上一個應用程式的快取。

When writing web pages, no matter whether you use native or front-end frameworks, there will be an entry point for the website, and when deploying to the machine, a web server such as Nginx or Apache will be used, and this entry point will be used by the user's browser. Cached, so that after the front-end application is updated, if the developer does not take other hot update methods or even abandons the website cache, the user must clear the website's cache to use the latest version.

So use this tool to change the entry point to a different name before executing the Web server every time you deploy, and write it into the Web server's configuration file, so that the entry point obtained by the user after executing the Web server will be the same as the previous one. The application version is different and will not use the cache of the previous application.

# Usage 使用

## 命令參數
```
nginx-path 部屬位置 nginx.conf 的路徑
entry-file-path 部屬位置 進入點的路徑，通常為 index.html 所在路徑
```

## 使用 Nginx 部屬
將nginx.conf index改為 ${deploy_web_entry} 
```
server {
    listen 80;
    root /usr/share/nginx/html;
    index ${deploy_web_entry};

    error_log /usr/local/error.log;
    access_log /usr/local/access.log main;


    location / {
        try_files $uri $uri/ @fallback;
        index index.html;
        add_header Cache-Control no-cache;
        add_header Access-Control-Allow-Origin *;
    }

    location @fallback {
        rewrite ^.*$ /index.html break;
        add_header Cache-Control no-cache;
    }

    # static files
    location ~ .*\\.(?:ico|js|gif|jpe?g|png|css|js|mp3) {
        expires max;
    }
}
```
