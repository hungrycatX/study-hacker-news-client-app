// XMLHttpRequest 객체를 생성하여 AJAX 요청을 수행
const ajax = new XMLHttpRequest();

// GET 메서드를 사용하여 HN PWA API에서 비동기적으로 뉴스 데이터를 요청하고 받아옴
ajax.open("GET", "https://api.hnpwa.com/v0/news/1.json", false);
ajax.send();

// 응답 데이터를 JSON 형식으로 파싱
const newsFeed = JSON.parse(ajax.response);

// 뉴스 제목을 나타내기 위해 ul과 li 엘리먼트를 생성
const ul = document.createElement("ul");

// 반복문을 사용하여 첫 10개의 뉴스 타이틀을 가져와 li 엘리먼트에 추가
for (let i = 0; i < 10; i++) {
  const li = document.createElement("li");
  li.innerHTML = newsFeed[i].title;
  ul.appendChild(li);
}

// 생성한 ul 엘리먼트를 HTML 문서의 root 엘리먼트에 추가
document.getElementById("root").appendChild(ul);