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

    //把这个container当成一个属性赋值给Panel构造函数,方便后续对这个翻译面板进行其他操作,如替换面板中的内容
    this.container = container

    //把关闭按钮也赋值到Panel的属性close上
    this.close = container.querySelector('.close')

    //用来显示需要查询的内容
    this.source = container.querySelector('.source .content')

    //用来显示翻译后的内容
    this.dest = container.querySelector('.dest .content')
}

Panel.prototype.Bind = function () {
    this.close.onclick = () => {
        this.Hide()
    }
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
    let target = e.target || e.srcElement
    let _target = document.querySelector('.translate-panel')
    // _target.contains(target) 判断点击事件是否发生在_target元素内

    let text = getUserSelection()
    if (!text && !_target.contains(target)) {
        panel.Hide()
    }
}

// TODO:窗口尺寸调整