const draggable_list = document.querySelector('#draggable-list')
const check = document.querySelector('#check')

const data = [
  '한식 음식점업',
  '기타 간이 음식점업',
  '이용 및 미용업',
  '음ㆍ식료품 위주 종합 소매업',
  '비알코올 음료점업',
  '외국식 음식점업',
  '식료품 소매업',
  '의약품, 의료용 기구, 화장품 및 방향제 소매업',
  '의복 소매업',
  '일반 교습학원',
]

//리스트 아이템 저장
const listItems = []
let dragStartIndex

createList()

// 리스트 아이템 DOM 업데이트
function createList() {
  ;[...data].forEach((item, index) => {
    const listItem = document.createElement('li')
    listItem.setAttribute('data-index', index)
    listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <span class="item">${item}</span>
            <i class="fas fa-grip-lines"></i>
        </div>
        `
    listItems.push(listItem)
    draggable_list.appendChild(listItem)
  })
}
