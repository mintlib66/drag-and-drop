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
  console.log('start ' + dragStartIndex)
}
function dragOver(e) {
  e.preventDefault()
}
function dragEnter() {
  this.classList.add('over')
}
function dragLeave() {
  this.classList.remove('over')
}
function dragDrop() {
  const dragEndIndex = this.getAttribute('data-index')
  console.log('drop ' + dragEndIndex)
  swapItems(dragStartIndex, dragEndIndex)

  this.classList.remove('over')
}
function swapItems(fromIndex, toIndex) {
  const fromItem = listItems[fromIndex].querySelector('.draggable')
  const toItem = listItems[toIndex].querySelector('.draggable')
  console.log(fromIndex + '->' + toIndex)
  console.log(fromItem, toItem)

  listItems[fromIndex].appendChild(toItem)
  listItems[toIndex].appendChild(fromItem)
}
