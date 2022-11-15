# 值得推薦的餐廳網站


## 網站畫面
![MyImage](https://github.com/kai3kai2/Restaurant-List/blob/main/picture/introduce.png)

## Introduce
這是一個可以紀錄自己餐廳的網站，可以查看餐廳，可以查看詳細資訊。

### 功能介紹
+ 查看全部的餐廳
+ 點擊餐廳的圖片或名字可以瀏覽餐廳的詳細資料
+ 搜尋特定的餐廳
+ 右上角可以新增餐廳
+ 點擊圖示可以編輯餐廳資料
+ 點擊圖示可以刪除餐廳

## 使用本專案
1. 先確認有安裝 Node.js 與 npm
***

2. 使用 clone 到本地資料，使用 Terminal 輸入指令

```
git clone https://github.com/kai3kai2/Restaurant-List.git
```

***
3. 安裝npm套件，使用 Terminal 輸入指令

```
npm install 
```

***
4. 新增.env檔案並設置資料庫連線字串，

```
MONGODB_URL=mongodb+srv://<account>:<password>@cluster0.<xxxxx>.mongodb.net/<table>?retryWrites=true&w=majority
```

***
5. 啟用前先使用 Terminal 輸入以下指令建立種子資料，看見done代表建立成功。

```
npm run seed
```

啟用專案在 Terminal 請輸入以下指令

```
npm run dev
```

***
6. 若成功運行會出現以下文字，右邊網址可以前往

```
The server is listening on http://localhost:${3000}
```

***
7. 欲暫停此專案在 Terminal 使用 :

```
ctrl + c (windows)
command + c (mac)
```

## 開發工具
+ Node.js 4.16.0
+ Express 4.16.4
+ Express-Handlebars 3.0.0
+ Bootstrap 5.2.2
+ Font-awesome 6.2.0
+ MongoDB
+ mongoose 6.7.2