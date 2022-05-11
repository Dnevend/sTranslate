chrome.runtime.onInstalled.addListener(function () {
    // storage中设置值
    chrome.storage.sync.set({ color: "#3aa757" }, function () {
        console.log("storage init color value");
    });
    // 为特定的网址显示图标
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostEquals: "baidu.com" },
                    }),
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ]);
    });

    // 右键菜单
    chrome.contextMenus.create({
        id: "1",
        title: "Test Context Menu",
        contexts: ["all"],
    });
    //分割线
    chrome.contextMenus.create({
        type: "separator",
    });
    // 父级菜单
    chrome.contextMenus.create({
        id: "2",
        title: "Parent Context Menu",
        contexts: ["all"],
    });
    chrome.contextMenus.create({
        id: "21",
        parentId: "2",
        title: "Child Context Menu1",
        contexts: ["all"],
    });
});