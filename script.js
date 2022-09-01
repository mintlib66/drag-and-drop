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
check.addEventListener('click', checkOrder)

const numbers = []

// 리스트 아이템 DOM 업데이트
function createList() {
  ;[...data]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
      const listItem = document.createElement('li')
      listItem.setAttribute('data-index', index)
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <span class="name">${item}</span>
            <i class="fas fa-grip-lines"></i>
        </div>
        `
      listItems.push(listItem)
      draggable_list.appendChild(listItem)
    })
  addDragEvent()
}

//드래그&드롭 이벤트 처리
function addDragEvent() {
  const draggable = document.querySelectorAll('.draggable')
  const dragListItem = document.querySelectorAll('.draggable-list li')

  draggable.forEach(item => {
    item.addEventListener('dragstart', dragStart)
  })
  dragListItem.forEach(item => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
  })
}

function dragStart() {
  dragStartIndex = this.closest('li').getAttribute('data-index')
}
function dragOver(e) {
  //기본처리 막아서 drop이벤트 허용
  e.preventDefault()
}
function dragEnter() {
  console.log('enter')
  this.classList.add('over')
}
function dragLeave() {
  console.log('leave')
  this.classList.remove('over')
}
function dragDrop() {
  const dragEndIndex = this.getAttribute('data-index')
  swapItems(dragStartIndex, dragEndIndex)

  this.classList.remove('over')
}
function swapItems(fromIndex, toIndex) {
  const fromItem = listItems[fromIndex].querySelector('.draggable')
  const toItem = listItems[toIndex].querySelector('.draggable')

  listItems[fromIndex].appendChild(toItem)
  listItems[toIndex].appendChild(fromItem)
}

//순서 확인 처리
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const item = listItem.querySelector('.name').innerText
    if (item === data[index]) {
      listItem.classList.remove('wrong')
      listItem.classList.add('right')
    } else {
      listItem.classList.remove('right')
      listItem.classList.add('wrong')
    }
  })
}
