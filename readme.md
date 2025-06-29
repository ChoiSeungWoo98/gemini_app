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
{
  "name": "my-gemini-app",
  "version": "1.0.1",
  "description": "My personal desktop app for Gemini",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder --publish never"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "electron": "^28.0.0",
    "electron-builder": "^24.9.1"
  },
  "build": {
    "appId": "com.your-name.gemini-app",
    "productName": "My Gemini App",
    "mac": {
      "category": "public.app-category.productivity",
      "target": "dmg"
    }
  }
}
 ~~~

# 앱 빌드
npm run build 

# Git 저장소에 코드 업로드
# .github/workflows/release.yml 파일 생성
mkdir -p .github/workflows
touch .github/workflows/release.yml

# 아래 코드 복붙
~
# 워크플로우의 이름입니다. GitHub Actions 탭에 이 이름이 표시됩니다.
name: Create Release and Upload DMG

# 이 워크플로우가 언제 실행될지 정의합니다.
on:
  push:
    # 'v'로 시작하는 태그(예: v1.0.0, v1.2.3)가 푸시되었을 때만 실행됩니다.
    tags:
      - 'v*'

# 실제 수행할 작업들을 정의합니다.
jobs:
  build-and-release:
    # 이 작업은 macOS 가상 환경에서 실행됩니다. .dmg 파일을 빌드해야 하므로 필수입니다.
    runs-on: macos-latest
    # 이 작업에 필요한 권한을 명시적으로 부여합니다.
    # contents: write 권한이 있어야 GitHub Release를 생성할 수 있습니다.
    permissions:
      contents: write

    # 작업의 단계들을 순서대로 정의합니다.
    steps:
      # 1. 소스 코드 가져오기
      # 현재 저장소의 코드를 가상 머신으로 체크아웃합니다.
      - name: Checkout code
        uses: actions/checkout@v4

      # 2. Node.js 환경 설정
      # 앱 빌드에 필요한 Node.js를 설치합니다.
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '24' # 프로젝트에 맞는 Node.js 버전을 사용하세요.

      # 3. 의존성 설치
      # package.json을 기반으로 의존성을 설치합니다.
      - name: Install dependencies
        run: npm install

      # 4. 앱 빌드 실행
      # package.json에 정의된 build 스크립트를 실행하여 .dmg 파일을 생성합니다.
      - name: Build the app
        run: npm run build

      # 5. 릴리즈 생성 및 .dmg 파일 업로드
      # 태그 정보를 바탕으로 GitHub Release를 만들고, 빌드된 .dmg 파일을 첨부합니다.
      - name: Create Release and Upload Asset
        uses: softprops/action-gh-release@v2
        with:
          # dist/ 폴더 아래에 있는 모든 .dmg 파일을 찾아 첨부합니다.
          files: dist/*.dmg
        env:
          # 릴리즈를 생성하기 위해 필요한 인증 토큰입니다. GitHub에서 자동으로 제공하므로
          # 따로 설정할 필요 없이 이대로 두면 됩니다.
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

~

# 태그 생성
# git tag v1.0.0
# git push <remote-name> v1.0.0
# npm version v1.0.0
npm version <version-number>
# 손쉬운 버전 관리 명령어
# npm version patch : 패치 버전 올리기 1.0.1
# npm version minor : 마이너 버전 올리기 1.1.0
# npm version major : 메이저 버전 올리기 2.0.0
git push && git push --tags

결론(예시)
git add
git commit
npm version patch
git push && git push --tags
```
