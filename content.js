function Panel() {

    this.Create()

    this.Bind()

}

Panel.prototype.Create = function () {

    // let icon = document.createElement('div')
    // let iconHtml = `<div>T</div>`
    // icon.innerHTML = iconHtml

    let container = document.createElement('div')

    let html = `
        <header>翻译<span class="close">X</span></header>
        <main>
            <div class="source">
            <div class="title">English</div>
            <div class="content"></div>
            </div>
            <div class="dest">
            <div class="title">中文</div>
            <div class="content">...</div>
            </div>
        </main>
    `

    container.innerHTML = html

    container.classList.add('translate-panel')

    document.body.appendChild(container)

    // 把这个container当成一个属性赋值给Panel构造函数,方便后续对这个翻译面板进行其他操作,如替换面板中的内容
    this.container = container

    // 把关闭按钮也赋值到Panel的属性close上
    this.close = container.querySelector('.close')
    // 用来显示需要查询的内容
    this.source = container.querySelector('.source .content')
    // 用来显示翻译后的内容
    this.dest = container.querySelector('.dest .content')

    // 鼠标是否按下
    this.isMouseDown = false
    this.initX = 0
    this.initY = 0
}

Panel.prototype.Bind = function () {
    this.close.onclick = () => {
        this.Hide()
    }

    this.container.addEventListener('mousedown', function (e) {
        this.isMouseDown = true
        this.initX = e.offsetX
        this.initY = e.offsetY
    })

    this.container.addEventListener('mouseup', function () {
        this.isMouseDown = false
    })

    this.container.addEventListener('mousemove', function (e) {

        console.log('isMouseDown', this.isMouseDown)
        if (this.isMouseDown && isEventInTarget(e, '.translate-panel')) {
            let target = document.querySelector('.translate-panel')
            target.style.top = (e.pageY - this.initY) + 'px'
            target.style.left = (e.pageX - this.initX) + 'px'
        }
    })
}

Panel.prototype.translate = function (text) {
    this.source.innerText = text
    this.dest.innerText = text

    // 源语言
    let sourceLang = 'en'
    // 目标语言
    let targetLang = 'zh-hans'
}

Panel.prototype.Show = function () {
    this.container.classList.add('show')
    this.visible = true
}

Panel.prototype.Hide = function () {
    this.container.classList.remove('show')
    this.visible = false
}

Panel.prototype.pos = function (pos) {
    this.container.style.top = pos.y + 'px'
    this.container.style.left = pos.x + 'px'
}

let panel = new Panel()

window.onmouseup = function (e) {

    let text = getUserSelection()

    let x = e.pageX
    let y = e.pageY

    if (!text) {
        return
    } else {
        panel.pos({ x: x, y: y })
        panel.translate(text)
        panel.Show()
    }

}

window.onclick = function (e) {
    

    let text = getUserSelection()
    if (!text && !isEventInTarget(e, '.translate-panel')) {
        panel.Hide()
    }
}

// TODO:窗口尺寸调整


// 防抖函数

// 判断事件是否发生在指定元素内
function isEventInTarget(e, selector) {
    let target = e.target || e.srcElement
    let _target = document.querySelector(selector)

    return _target.contains(target)
}

// 获取用户选择内容
function getUserSelection() {

    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }

    // 弹出翻译窗口
    return text.trim()
}