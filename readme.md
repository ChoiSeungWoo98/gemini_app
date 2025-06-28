## 앱 생성 순서

```shell
# 앱 폴더 진입
# npm 초기 구축
npm init -y

# electron 프레임워크 설치
npm install --save-dev electron

# main.js 파일 생성
touch main.js

# package.json 수정
# "scripts": {"test": ""}, => "scripts": {"start": "electron ."},
```

## dmg 파일 생성
```shell
# builder 설치
npm install --save-dev electron-builder

# package.json 수정

~~~
# scripts쪽에 "build": "electron-builder" 추가
# 아래 내용 마지막에 추가
  "build": {
    "appId": "com.your-name.gemini-app",
    "productName": "My Gemini App",
    "mac": {
      "category": "public.app-category.productivity",
      "target": "dmg"
    }
  }
 ~~~

# 앱 빌드
npm run build 

# 

```
