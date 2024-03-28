const container = document.getElementById("root"); // 루트 엘리먼트를 컨테이너로 설정
const ajax = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
const content = document.createElement("div"); // 동적 콘텐츠를 담을 div 엘리먼트 생성
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json"; // 뉴스 API 엔드포인트 URL
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json"; // 뉴스 콘텐츠 API 엔드포인트 URL

function getData(url) {
  // AJAX 요청을 위한 데이터 가져오기 함수 정의
  ajax.open("GET", url, false); // 뉴스 API에 GET 요청을 보냄
  ajax.send(); // 요청 전송

  return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL); // 뉴스 피드 JSON 형식으로 파싱
const ul = document.createElement("ul"); // ul 엘리먼트 생성

window.addEventListener("hashchange", function () {
  // 해시 변경 시 이벤트 리스너 추가
  const id = location.hash.substr(1); // 해시 값에서 id 추출

  const newsContent = getData(CONTENT_URL.replace("@id", id)); // 뉴스 콘텐츠 파싱
  const title = document.createElement("h1"); // h1 엘리먼트 생성

  title.innerHTML = newsContent.title; // 타이틀 설정

  content.innerHTML = ""; // content 내용 초기화
  content.appendChild(title); // 타이틀을 content에 추가
});

for (let i = 0; i < 10; i++) {
  // 뉴스 피드를 반복하여 리스트 생성
  const div = document.createElement("div");

  // 뉴스 리스트를 생성하고 해당 뉴스로 이동하는 링크 추가
  div.innerHTML = `
  <li>
    <a href="#${newsFeed[i].id}">${newsFeed[i].title} (${newsFeed[i].comments_count})</a>
  </li>
  `;
  ul.appendChild(div.firstElementChild); // ul에 div태그의 첫 번째 자식요소 li태그 추가
}

container.appendChild(ul); // 컨테이너에 ul 추가
container.appendChild(content); // 컨테이너에 content 추가
