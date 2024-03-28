const container = document.getElementById("root"); // 루트 엘리먼트를 컨테이너로 설정
const ajax = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
const content = document.createElement("div"); // 동적 콘텐츠를 담을 div 엘리먼트 생성
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json"; // 뉴스 API 엔드포인트 URL
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json"; // 뉴스 콘텐츠 API 엔드포인트 URL

ajax.open("GET", NEWS_URL, false); // 뉴스 API에 GET 요청을 보냄
ajax.send(); // 요청 전송

const newsFeed = JSON.parse(ajax.response); // 뉴스 피드 JSON 형식으로 파싱
const ul = document.createElement("ul"); // ul 엘리먼트 생성

window.addEventListener("hashchange", function () {
  // 해시 변경 시 이벤트 리스너 추가
  const id = location.hash.substr(1); // 해시 값에서 id 추출

  ajax.open("GET", CONTENT_URL.replace("@id", id), false); // 해당 뉴스 콘텐츠 API에 GET 요청을 보냄
  ajax.send(); // 요청 전송

  const newsContent = JSON.parse(ajax.response); // 뉴스 콘텐츠 파싱
  const title = document.createElement("h1"); // h1 엘리먼트 생성

  title.innerHTML = newsContent.title; // 타이틀 설정

  content.innerHTML = ""; // content 내용 초기화
  content.appendChild(title); // 타이틀을 content에 추가
});

for (let i = 0; i < 10; i++) {
  // 뉴스 피드를 반복하여 리스트 생성
  const li = document.createElement("li"); // li 엘리먼트 생성
  const a = document.createElement("a"); // a 엘리먼트 생성

  a.href = `#${newsFeed[i].id}`; // a 태그의 href 속성 설정
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`; // a 태그의 텍스트 설정

  li.appendChild(a); // li에 a를 자식으로 추가
  ul.appendChild(li); // ul에 li를 자식으로 추가
}

container.appendChild(ul); // 컨테이너에 ul 추가
container.appendChild(content); // 컨테이너에 content 추가