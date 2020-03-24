"ui";
var form = {
    isLongRead: false,
    isLongWatch: false
}
ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="强国助手 V1.0.5"/>
        </appbar>
        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
        <ScrollView>
        <vertical>
        <frame height="40" gravity="center">
            <text text="*注意*" gravity="center" textSize="18sp" textColor="red" textStyle="bold"/>
        </frame>
        <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <ScrollView>
            <vertical padding="18 8" h="auto">
                <text text="项目说明文档: (请留意新版本的发布)" textColor="#222222" textSize="14sp"/>
                <text autoLink="web" text="https://github.com/XiangyuTang/LearnChinaHelper "/>
            </vertical>
            </ScrollView>
            <View bg="#f44336" h="*" w="10"/>
        </card>
        <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <ScrollView>
            <vertical padding="18 8" h="auto">
                <text text="1.首次安装请先开启无障碍服务和截图与允许通知权限" textColor="#222222" textSize="14sp"/>
                <text text="2.若未开启通知权限,首次使用建议打开↗的悬浮窗权限" textColor="#222222" textSize="14sp"/>
                <text text="3.开始运行前请先关闭学习强国,由脚本运行后自动启动" textColor="#222222" textSize="14sp"/>
                <text text="4.脚本执行过程中请勿操作手机" textColor="#222222" textSize="14sp"/>
            </vertical>
            </ScrollView>
            <View bg="#f44336" h="*" w="10"/>
        </card>
        <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <ScrollView>
            <vertical padding="18 8" h="auto">
                <text text="当前版本强国助手支持的功能包括：(以下任务预计花费7分钟)" textColor="#222222" textSize="14sp"/>
                <text text="阅读文章、视听学习、收藏、分享、订阅、评论、本地频道" textColor="#999999" textSize="14sp"/>
            </vertical>
            </ScrollView>
            <View bg="#4caf50" h="*" w="10"/>
        </card>
        <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <ScrollView>
            <vertical padding="18 8" h="auto">
                <text text="坚持把学习贯彻习近平总书记系列重要讲话精神作为重大政治任务，认真学习党的先进理论与指导思想，请勿利用本软件投机取巧." textColor="#222222"/>
            </vertical>
            </ScrollView>
            <View bg="#4caf50" h="*" w="10"/>
        </card>
        <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <ScrollView>
            <vertical padding="18 8" h="auto">
                <text text="是否执行文章学习时长任务：(预计最多花费12分钟)" textColor="#222222"/>
                <radiogroup id="long_read">
                        <radio id="yes_read"  text="是"></radio>
                        <radio  id="no_read" text="否" checked = "true"></radio>
                </radiogroup>
            </vertical>
            </ScrollView>
            <View bg="#2196f3" h="*" w="10"/>
        </card>
        <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <ScrollView>
            <vertical padding="18 8" h="auto">
                <text text="是否执行视听学习时长任务：(建议在wifi环境下执行，预计最多花费18分钟)" textColor="#222222"/>
                <radiogroup id="long_watch">
                        <radio id="yes_watch"  text="是"></radio>
                        <radio id="no_watch" text="否" checked = "true"></radio>
                </radiogroup>
            </vertical>
            </ScrollView>
            <View bg="#2196f3" h="*" w="10"/>
        </card>
        <linear gravity="center">
            <button id="start" text="开始运行" style="Widget.AppCompat.Button.Colored" w="auto"/>
            <button id="stop" text="停止运行"  w="auto"/>
        </linear>
        <frame height="20" gravity="center">
            <text text="---------------------------------------------------------------------------------------------------------------------------------" gravity="center"/>
        </frame>
        <frame height="50" gravity="center">
            <text text="Copyright©2020 by Txy 一岸流年1998" gravity="center"/>
        </frame>
        </vertical>
        </ScrollView>
    </vertical>
);

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("启动悬浮窗");
    menu.add("运行日志");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "启动悬浮窗":
            var intent = new Intent();
            intent.setAction("android.settings.action.MANAGE_OVERLAY_PERMISSION");
            app.startActivity(intent);
            break;
        case "运行日志":
            app.startActivity('console');
            break;
        case "关于":
            alert("关于", "强国助手 v1.0.5\n1.新增悬浮窗日志显示功能\n2.解决阅读时长任务的bug\n3.优化订阅任务\n4.新增选项菜单");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

ui.yes_read.on("check",function(check){
    if(check){
        form.isLongRead= true;
    }
});
ui.no_read.on("check",function(check){
    if(check){
        form.isLongRead= false;
    }
});
ui.yes_watch.on("check",function(check){
    if(check){
        form.isLongWatch= true;
    }
});
ui.no_watch.on("check",function(check){
    if(check){
        form.isLongWatch= false;
    }
});
ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if(checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if(!checked && auto.service != null){
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

ui.start.on("click", function(){
    //程序开始运行之前判断无障碍服务
    if(auto.service == null) {
        toastLog("请先开启无障碍服务！");
        return;
    }
    main();
});

ui.stop.on("click",function(){
    threads.shutDownAll();
    engines.stopAll();
    exit();
    toast("已终止执行脚本");
});


function main() {
    // 这里写脚本的主逻辑
    threads.start(function () {
        if(!requestScreenCapture()){
            toastLog("请先开启截图权限，以执行收藏任务！");
            return;
        }
        try {
            //启动悬浮窗日志
            console.show();
            launchApp("学习强国");
            toastLog("主程序开始运行");
            waitForPackage("cn.xuexi.android");
            sleep(3000);
            toast("开始执行脚本！")
            getTaskList(); // 获取任务列表
            doUnfinishedTask(); //执行当日未完成的任务
            getTaskList(); // 重新获取任务列表,装载最新的阅读和视听时长剩余次数
            doExtraTask();
            back();//回到手机主页
            sleep(2000);
        } catch (error) {
            log(error)
            toast("出现异常,请关闭应用重新执行脚本！");
            exit(); // 有异常退出，结束脚本
        }
        toastLog("运行结束,脚本自动退出...");
        threads.shutDownAll();
        console.hide();
        engines.stopAll();
        exit();
    });
}

var taskInfoList = []; // 装任务列表

function getTaskList() {
    // 从主页到我的主页
    className("android.widget.TextView").id('comm_head_xuexi_mine').findOne().click();
    sleep(2000);
    // 点击事件在我的积分父控件上
    id("user_item_name").text("学习积分").findOne().parent().click()
    // waitForPackage("cn.xuexi.android")
    //waitForActivity("com.alibaba.lightapp.runtime.activity.CommonWebViewActivity")
    toastLog("尝试获取任务列表...")
    //等待缓冲符号消失
    sleep(2000);
    while(className("android.widget.ImageView").exists())
    {
        sleep(1000);
        toastLog("等待加载...")
    }
    // sleep(8000);
    // 获取任务列表
    taskInfoList = []; // 重置
    className("android.widget.ListView").findOne().children().forEach(function (child) {
        var list = child.find(className('android.view.View'));
        // log(list)
        if (list.length > 5) {
            var title = list.get(2).contentDescription;
            var content = list.get(4).contentDescription;
            if (title && content) {
                var integralContent = content.split('/');
                var getIntegral = parseInt(integralContent[0].replace(/[^0-9]/ig, ""));
                var targetIntegral = parseInt(integralContent[1].replace(/[^0-9]/ig, ""));
                taskInfoList.push({
                    title: title,
                    getIntegral: getIntegral,
                    targetIntegral: targetIntegral,
                })
            }
        }
    });
    if (!taskInfoList.length) {
        toastLog('网络不稳定,获取任务失败！请关闭应用并重启脚本...');
        threads.shutDownAll();
        engines.stopAll();
        exit(); // 有异常退出，结束脚本
    } else {
        toastLog("成功获取任务列表,退到首页");
        log(taskInfoList);
        back();//从“积分”页跳转到“我的”
        sleep(2000);
        back();//从“我的”跳转到“首页”
        sleep(2000);
    }
};


function doUnfinishedTask(){
    var flag = 0;//判断是否完成所有任务满分的标志
    var read_article_flag = 2 //判断阅读文章任务是否已完成，作为参数传入视听学习任务的new_vedio_list用于控件寻找
    for(i=0;i<taskInfoList.length;i++){
        var task = taskInfoList[i];
        // log(task);
        //如果当日获得积分<当日上限积分
        if(task.getIntegral < task.targetIntegral){
            flag = 1;
            // log('未达成满分的任务有：'+task.title)
            if(task.title=='阅读文章'){
                rest_num = task.targetIntegral-task.getIntegral;
                read_article_flag = 2;
                readArticle(rest_num,8,false);//默认阅读8s，执行短时阅读任务
                continue;
            }
            else if(task.title=='视听学习'){
                rest_num = task.targetIntegral-task.getIntegral;
                learnVideo(rest_num,read_article_flag,8,false);//默认观看8s,执行短时视听任务
                continue;
            }
            else if(task.title=='每日答题'){
                sleep(2000)
                toastLog('开始执行每日答题任务(暂未开发)')
                continue;
            }
            else if(task.title=='每周答题'){
                toastLog('开始执行每周答题任务(暂未开发)')
                sleep(2000)
                continue;
            }
            else if(task.title=='专项答题'){
                toastLog('开始执行专项答题任务(暂未开发)')
                sleep(2000)
                continue;
            }
            else if(task.title=='订阅'){
                rest_num = task.targetIntegral-task.getIntegral;
                subscribe(rest_num);
                continue;
            }
            else if(task.title=='分享'){
                share();
                continue;
            }
            else if(task.title=='收藏'){
                collect();
                continue;
            }
            else if(task.title=='发表观点'){
                comment();
                continue;
            }
            else if(task.title=='本地频道'){
                localChannel();
                continue;
            }
            
        }

    }
    if(!flag)
    {
        toastLog('已完成当日所有脚本任务！d=====(￣▽￣*)b')
    }
};

function doExtraTask(){
    toastLog('执行额外脚本任务....')
    sleep(1000);
    var read_article_flag = 2;
    if(form.isLongRead)
    {
        read_article_flag = 2;
        toastLog("开始执行文章学习时长任务...")
        sleep(1000);
        //读rest_num篇文章，每篇文章阅读125s
        for(i=0;i<taskInfoList.length;i++){
            var task = taskInfoList[i];
            if(task.getIntegral < task.targetIntegral&&task.title=='文章学习时长'){
                rest_num = task.targetIntegral-task.getIntegral;
                readArticle1(rest_num,125,true);
            }
        }
    }
    if(form.isLongWatch)
    {
        toastLog("开始执行视听学习时长任务...");
        sleep(1000);
        //看rest_num个视频，每个视频观看185s
        for(i=0;i<taskInfoList.length;i++){
            var task = taskInfoList[i];
            if(task.getIntegral < task.targetIntegral&&task.title=='视听学习时长'){
                rest_num = task.targetIntegral-task.getIntegral;
                learnVideo(rest_num,read_article_flag,185,true);
            }
        }
        
    }
    toastLog('额外任务执行完成！d=====(￣▽￣*)b')
}

/**
 * @function readArticle 阅读时长任务（短时）
 * @param num 待完成任务的数量。
 * @param time 阅读文章的时间(s)。
 * @param isLong 是否执行长时任务。
 */
function readArticle(num,time,isLong){
    sleep(1000);
    toastLog('开始执行阅读文章任务...')
    //点击学习控件
    id("home_bottom_tab_button_work").findOne().click();
    sleep(1500);
    //点击要闻
    className("android.widget.TextView").text("要闻").findOne().parent().click();
    sleep(1500);
    //先看右上角总积分，如果看完某文章，积分没变，说明该文章以前看过，不算有效文章，num不减
    var origin_score = id("comm_head_xuexi_score").findOne().getText();
    sleep(1500);
    log("origin_score:"+origin_score)
    var newListView = className("android.widget.ListView").depth(20).findOnce(1);
    //阅读文章
    while(num>0){
        newListView = className("android.widget.ListView").depth(20).findOnce(1);
        log('newListView:'+newListView)
        sleep(1000);
        if(newListView!=null)
        {
            // log('newListView:'+newListView)
            var newslist = newListView.children();
            // log('list.length:'+newslist.length);
            if (newslist.length > 0) 
            {
                newslist.forEach(function(item,index){
                    if(index&&num>0){//index==0时是linearLayout控件，无法点击，也不是子项要闻
                        sleep(1000);
                        isClick = item.click()//进入新闻内容页
                        sleep(1500);
                        if(isClick)
                        {
                            num--;
                            toastLog("进行模拟阅读"+time+"s...剩余阅读篇数："+num);
                            // waitForPackage("cn.xuexi.android");
                            for(var t=1;t<=time;t++)
                            {
                                sleep(1000);
                                left_time = time-t;
                                if(left_time%5==0)
                                {
                                    toastLog("还剩"+left_time+"s阅读时间...");
                                    //未防止息屏的唤醒屏幕操作
                                    device.wakeUp();
                                }
                            }
                            back();
                            // className("android.widget.ImageView").depth(11).findOne().click();
                            sleep(2000);
                            //返回之后看积分是否变化，若未变化，num++
                            var new_score = id("comm_head_xuexi_score").findOne().getText();
                            if(new_score==origin_score)
                            {
                                if(isLong)//如果是阅读时长任务
                                {
                                    num++;
                                    toastLog("检测积分未发生变化...向下翻页并进行长时阅读");
                                    pn = random(3,8);
                                    for(var p=1;p<=pn;p++)//往下多滑动几次
                                    {
                                        newListView.scrollDown();
                                        sleep(1000);
                                    }
                                }
                                else
                                {
                                    num++;
                                    toastLog("检测积分未发生变化...向下翻页并重置剩余阅读篇数："+num);
                                }
                                newListView.scrollDown();
                            }
                            else
                            {
                                origin_score = new_score;
                            }
                        }
                    }
                });
            }
            newListView.scrollDown();
        } 
    }
    toastLog('阅读文章任务执行结束！d==(￣▽￣*)b')
    //点击学习控件回到新闻首页
    id("home_bottom_tab_button_work").findOne().click();
    sleep(1000);
};

/**
 * @function readArticle1 由于控件会谜之变化的原因，无可奈何为阅读时长任务特别写的方法
 * @param num 待完成任务的数量。
 * @param time 阅读文章的时间(s)。
 * @param isLong 是否执行长时任务。
 */
function readArticle1(num,time,isLong){
    sleep(1000);
    toastLog('开始执行阅读时长任务...')
    //点击学习控件
    id("home_bottom_tab_button_work").findOne().click();
    sleep(1500);
    //点击要闻
    className("android.widget.TextView").text("要闻").findOne().parent().click();
    //先看右上角总积分，如果看完某文章，积分没变，说明该文章以前看过，不算有效文章，num不减
    var origin_score = id("comm_head_xuexi_score").findOne().getText();
    log("origin_score:"+origin_score)
    var newListView = className("android.widget.ListView").depth(20).findOne();
    //阅读文章
    //为长时阅读设定积分未变化停止机制，如果检测到积分未变化2次，停止阅读
    var stop_flag = 0;
    while(num>0){
        if(stop_flag==2)
        {
            break;
        }
        if(newListView.bounds().right==0)//正常的listView控件范围应该是Rect(0, 357 - 1080, 2195)
        {
            //如果进入这个条件，说明控件找成了Rect(0, 357 - 0, 2195),是错的
            log("检测到newListView控件不对，自动修改...")
            listViewFlag = 1;
            newListView = className("android.widget.ListView").depth(20).findOnce(1);
        }
        else{
            newListView = className("android.widget.ListView").depth(20).findOne();
        }
        log('newListView:'+newListView)
        if(newListView!=null)
        {
            // log('newListView:'+newListView)
            var newslist = newListView.children();
            // log('list.length:'+newslist.length);
            if (newslist.length > 0) 
            {
                newslist.forEach(function(item,index){
                    if(index&&num>0){//index==0时是linearLayout控件，无法点击，也不是子项要闻
                        sleep(2000);
                        isClick = item.click()//进入新闻内容页
                        if(isClick)
                        {
                            num--;
                            toastLog("进行模拟阅读"+time+"s...剩余阅读篇数："+num);
                            // waitForPackage("cn.xuexi.android");
                            for(var t=1;t<=time;t++)
                            {
                                sleep(1000);
                                left_time = time-t;
                                if(left_time%5==0)
                                {
                                    toastLog("还剩"+left_time+"s阅读时间...");
                                    //未防止息屏的唤醒屏幕操作
                                    device.wakeUp();
                                }
                            }
                            back();
                            // className("android.widget.ImageView").depth(11).findOne().click();
                            sleep(2000);
                            //返回之后看积分是否变化，若未变化，num++
                            var new_score = id("comm_head_xuexi_score").findOne().getText();
                            if(new_score==origin_score)
                            {
                                if(isLong)//如果是阅读时长任务
                                {
                                    num++;
                                    toastLog("检测积分未发生变化...向下翻页并进行长时阅读");
                                    stop_flag++;
                                    pn = random(3,8);
                                    for(var p=1;p<=pn;p++)//往下多滑动几次
                                    {
                                        newListView.scrollDown();
                                        sleep(1000);
                                    }
                                }
                                else
                                {
                                    num++;
                                    toastLog("检测积分未发生变化...向下翻页并重置剩余阅读篇数："+num);
                                }
                                newListView.scrollDown();
                            }
                            else
                            {
                                origin_score = new_score;
                            }
                        }
                    }
                });
                // break;
            }
            newListView.scrollDown();
        } 
    }
    toastLog('阅读文章任务执行结束！d==(￣▽￣*)b')
    //点击学习控件回到新闻首页
    id("home_bottom_tab_button_work").findOne().click();
    sleep(1000);
};

/**
 * @function learnVideo 由于控件会谜之变化的原因，无可奈何为阅读时长任务特别写的方法
 * @param num 待完成任务的数量。
 * @param read_article_flag 主要用于判断阅读文章任务是否做过，如果做过，会影响new_vedio_list寻找控件
 * @param time 阅读文章的时间(s)。
 * @param isLong 是否执行长时任务。
 */
function learnVideo(num,read_article_flag,time,isLong){
    log("read_article_flag:"+read_article_flag);
    sleep(1000);
    toastLog('开始执行视听学习任务...');
    //进入电视台频道
    desc("电视台").id("home_bottom_tab_button_contact").findOne().click();
    //先看右上角总积分，如果看完某视频，积分没变，说明该视频以前看过，不算有效视频，num不减
    var origin_score = id("comm_head_xuexi_score").findOne().getText();
    log("origin_score:"+origin_score)
    //进入第一频道
    className("android.widget.TextView").text("第一频道").findOne().parent().click();
    var new_vedio_list = className("android.widget.ListView").depth(20).findOnce(read_article_flag);
    while(num>0){
        new_vedio_list = className("android.widget.ListView").depth(20).findOnce(read_article_flag);
        log('new_vedio_list:'+new_vedio_list)
        if(new_vedio_list!=null)
        {
            var newslist = new_vedio_list.children();
            if (newslist.length > 0) 
            {
                newslist.forEach(function(item,index){
                    if(index&&num>0){//index==0时是linearLayout控件，无法点击，也不是子项要闻
                        sleep(1000);
                        isClick = item.click()//进入视频内容页
                        sleep(2000);
                        if(isClick)
                        {
                            num--;
                            //如果用户用的流量观看视频
                            if(text("继续播放").exists()){
                                toastLog("自动点击继续播放,将消耗用户流量...");
                                className("android.widget.TextView").text("继续播放").findOne().click();
                                sleep(1000);
                            }
                            else{
                                toastLog("自动播放...");
                                sleep(1000);
                            }
                            toastLog("进行模拟观看"+time+"s...剩余视听："+num+"次");
                            for(var t=1;t<=time;t++)
                            {
                                sleep(1000);
                                left_time = time-t;
                                if(left_time%5==0)
                                {
                                    toastLog("还剩"+left_time+"s视听时间...");
                                    //未防止息屏的唤醒屏幕操作
                                    device.wakeUp();
                                }
                            }
                            //点击返回
                            // className("android.widget.ImageView").depth(13).findOne().click()
                            back();
                            sleep(2000);
                            //返回之后看积分是否变化，若未变化，num++
                            var new_score = id("comm_head_xuexi_score").findOne().getText();
                            if(new_score==origin_score)
                            {
                                if(isLong)//如果是视听时长任务
                                {
                                    num++;
                                    toastLog("检测积分未发生变化...向下翻页并继续进行长时视听");
                                    pn = random(3,8);
                                    log("pn:"+pn);
                                    for(var p=1;p<=pn;p++)//往下多滑动几次
                                    {
                                        new_vedio_list.scrollDown();
                                        sleep(1000);
                                    }
                                }
                                else
                                {
                                    num++;
                                    toastLog("检测积分未发生变化...向下翻页并重置剩余视听次数："+num);
                                }
                                new_vedio_list.scrollDown();
                            }
                            else
                            {
                                origin_score = new_score;
                            }
                        }
                    }
                });
            }
        }
        else
        {
            if(read_article_flag==2)
            {
                read_article_flag = 1;
                new_vedio_list = className("android.widget.ListView").depth(20).findOnce(read_article_flag);
                log("read_article_flag = 1的new_vedio_list："+new_vedio_list)
            }
            else
            {
                read_article_flag = 2;
                new_vedio_list = className("android.widget.ListView").depth(20).findOnce(read_article_flag);
                log("read_article_flag = 2的new_vedio_list："+new_vedio_list)
            }
            new_vedio_list.scrollDown();
        } 
    }
    toastLog('视听学习任务执行结束！d==(￣▽￣*)b')
    //点击学习控件回到新闻首页
    id("home_bottom_tab_button_work").findOne().click();
    sleep(1000);
};

/**
 * @function collect 收藏任务
 */
function collect(){
    toastLog('开始执行收藏任务');
    sleep(1000);
    //点击要闻
    className("android.widget.TextView").text("要闻").findOne().parent().click();
    sleep(1000);
    //阅读文章
    var newListView = className("android.widget.ListView").depth(20).findOnce(1);
    // log('newListView:'+newListView)
    var num = 2;//待收藏文章数
    while(newListView!=null&&num>0)
    {
        // log('newListView:'+newListView)
        var newslist = newListView.children();
        // log('list.length:'+newslist.length);
        if (newslist.length > 0) 
        {
            newslist.forEach(function(item,index){
                if(index>0&&num>0){//index==0时是linearLayout控件，无法点击，也不是子项要闻
                    sleep(2000);
                    isClick = item.click()//进入新闻内容页
                    if(isClick)
                    {
                        toastLog("检测该文章是否收藏...");
                        sleep(2000);
                        //找到小星星控件
                        collect_star = className("android.widget.ImageView").depth(10).findOne();
                        log("collect_star:"+collect_star);
                        //检测小星星是否点亮
                        //截图取小星星控件的坐标范围
                        var img = captureScreen();
                        var star_bounds = collect_star.bounds();
                        //获取小星星中心的x,y坐标像素
                        var star_x = star_bounds.centerX();
                        var star_y = star_bounds.centerY();
                        // 小星星的中心RGB(255,196,61)
                        var collected_color = colors.rgb(255, 196, 61)
                        var color = images.pixel(img, star_x, star_y);
                        //如果颜色不匹配，说明未收藏
                        if(!colors.isSimilar(color,collected_color))
                        {
                            //收藏
                            toastLog("收藏该文章...");
                            sleep(1000);
                            collect_star.click();
                            num--;
                            sleep(1000);
                        }
                        //返回
                        back();
                        sleep(2000);
                    }
                }
            });
        }
        newListView.scrollDown();
        sleep(2000);
        newListView = className("android.widget.ListView").depth(20).findOnce(1);
    } 
    toastLog('收藏任务执行结束！d==(￣▽￣*)b')
    //点击学习控件回到新闻首页
    id("home_bottom_tab_button_work").findOne().click();
    sleep(1000);
};

/**
 * @function share 分享任务
 */
function share(){
    toastLog('开始执行分享任务...');
    sleep(1000);
    //点击要闻
    className("android.widget.TextView").text("要闻").findOne().parent().click();
    //阅读文章
    var newListView = className("android.widget.ListView").depth(20).findOnce(1);
    if(newListView!=null)
    {
        var newslist = newListView.children();
        if (newslist.length > 0) 
        {
            newslist.forEach(function(item,index){
                if(index>0&&index<=2){//index==0时是linearLayout控件，无法点击，也不是子项要闻
                    sleep(2000);
                    isClick = item.click()//进入新闻内容页
                    if(isClick)
                    {
                        sleep(1000);
                        toastLog("正在分享该文章...");
                        //找到分享控件
                        var share_icon = className("android.widget.ImageView").depth(10).drawingOrder(4).findOne();
                        // log("share_icon:"+share_icon);
                        share_icon.click();
                        sleep(2000);
                        var share_choice = text("分享到学习强国").id("txt_gv_item").findOne().parent();
                        // log("share_choice:"+share_choice);
                        sleep(2000);
                        //点击分享
                        share_choice.click();
                        //停留5秒
                        sleep(5000);
                        //返回新闻主体内容界面    
                        back();
                        sleep(2000);
                        // 返回要闻主页
                        back();
                    }
                }
            });
        }
        newListView.scrollDown();
    } 
    toastLog('分享任务执行结束！d==(￣▽￣*)b')
    //点击学习控件回到新闻首页
    id("home_bottom_tab_button_work").findOne().click();
    sleep(1000);
};

/**
 * @function comment 评论任务
 */
function comment(){
    toastLog('开始执行发表观点任务...');
    sleep(1000);
    //点击要闻
    className("android.widget.TextView").text("要闻").findOne().parent().click();
    //阅读文章
    var newListView = className("android.widget.ListView").depth(20).findOnce(1);
    if(newListView!=null)
    {
        var newslist = newListView.children();
        if (newslist.length > 0) 
        {
            newslist.forEach(function(item,index){
                if(index>0&&index<=2){//index==0时是linearLayout控件，无法点击，也不是子项要闻
                    sleep(2000);
                    isClick = item.click()//进入新闻内容页
                    if(isClick)
                    {
                        sleep(1000);
                        toastLog("正在发表观点...");
                        //找到Text文本框控件
                        var comment_icon = className("android.widget.TextView").text("欢迎发表你的观点").findOne();
                        // 点击发表观点
                        comment_icon.click();
                        sleep(2000);
                        //键入观点内容
                        className("android.widget.EditText").findOne().setText("中国加油！祝福祖国的未来更加繁荣昌盛！");
                        sleep(2000);
                        //点击发布
                        className("android.widget.TextView").text("发布").findOne().click();
                        toastLog("评论发布成功，等候10s回到主页...")
                        sleep(10000);
                        //回到新闻list页
                        back();
                    }
                }
            });
        }
        newListView.scrollDown();
    } 
    toastLog('发表观点任务执行结束！d==(￣▽￣*)b')
    //点击学习控件回到新闻首页
    id("home_bottom_tab_button_work").findOne().click();
    sleep(1000);
};

/**
 * @function localChannel 本地频道任务
 */
function localChannel(){
    toastLog('开始执行本地频道任务');
    sleep(1000);
    //找到推荐、要闻、本地频道等的父控件
    avv = className("android.view.ViewGroup").depth(14).findOnce(2);
    // log(avv)
    var address = ""
    avv.children().forEach(function(item,index){
        // log(item);
        if(index==3){//找到本地频道的入口控件，并点击
            address = item.child(0).getText();
            log(address);
            item.click();
        }
    });
    //找到第一个本地频道入口
    channel = className("android.widget.TextView").depth(26).textContains(address).findOne().parent();
    // log(channel)
    //点击进入
    channel.click();
    sleep(5000);
    back();
    sleep(2000);
    toastLog('本地频道任务执行结束！d==(￣▽￣*)b')
    //点击学习控件回到新闻首页
    id("home_bottom_tab_button_work").findOne().click();
    sleep(1000);
};

/**
 * @function dailyQuiz 每日答题任务
 */
function dailyQuiz(){
    
};
/**
 * @function weeklyQuiz 每周答题任务
 */
function weeklyQuiz(){
    
};

/**
 * @function specialQuiz 专项答题任务
 */
function specialQuiz(){
    
};

/**
 * @function challengeQuiz 挑战答题任务
 */
function challengeQuiz(){

};

//使用数据库来将已经订阅的存起来
importClass(android.database.sqlite.SQLiteDatabase);
importClass(android.media.MediaPlayer);
/**
 * @function init_database 初始化数据库，为订阅任务做准备
 */
function init_database() {
    //数据文件名
    var dbName = "subscribe.db";
    //文件路径
    var path = files.path(dbName);
    //确保文件存在
    if (!files.exists(path)) {
        files.createWithDirs(path);
    }
    //创建或打开数据库
    var db = SQLiteDatabase.openOrCreateDatabase(path, null)
    //判断表是否存在
    cursor = db.rawQuery("select name from sqlite_master where type='table' ", null)
    let flag = false
    while(cursor.moveToNext()){
       //遍历出表名
       let name = cursor.getString(0)
       if(name==='subscribed_tb')
       {
           log("database already exist" )
           flag=true
       }
    }
    if (!flag) {
         //创建表
       let table_sql = "create table subscribed_tb(_id integer primary key autoincrement,subscribed text)"
       db.execSQL(table_sql);
    }
}
/**
 * @function subscribe 订阅任务
 */
function subscribe(num) {
    sleep(1000);
    toastLog('开始执行订阅任务');
    // 从主页到我的主页
    id("comm_head_xuexi_mine").text("我的").findOne().click();
    sleep(1000);
    //点击订阅控件
    id("my_subscribe_tv").text("订阅").findOne().click();
    // waitForActivity("android.widget.FrameLayout",200);
    // log('过来了');
    sleep(1000);
    //初始化数据库
    init_database();
    //在我的订阅里面找到所有订阅号，存起来
    var subscribed_accounts = [];
    //打开数据库
    var dbName = "subscribe.db";
    //文件路径
    var path = files.path(dbName);
    var db = SQLiteDatabase.openOrCreateDatabase(path, null);
    //db.execSQL("delete from subscribed_tb")
    var list_view = className("android.widget.ListView").depth(11).findOne();
    // log(list_view)
    var bottom_flag = 0;
    let cursor = db.rawQuery("select count(1) from subscribed_tb", null);
    cursor.moveToNext()
    let count = cursor.getString(0)
    //将所有已经订阅的存起来
    while(list_view!=null && count == 0)
    {
        sleep(1000);
        var frameLayoutList = list_view.children();
        // log('frameLayoutList:'+frameLayoutList)
        frameLayoutList.forEach(function(item,index){
            if(item.className()=='android.widget.FrameLayout')
            {
                // log(item)
                var account_name = item.find(className("android.widget.TextView"));
                // log('已订阅：'+account_name[0].text())
                //将已订阅的数据插入数据库
                let insertSql = "insert into subscribed_tb values (null,'"+account_name[0].text()+"')"
                //query="select * from tiku"
                db.execSQL(insertSql);
                log(insertSql )
            }
            else if(item.className()=='android.widget.LinearLayout')//遍历到底了
            {
                bottom_flag = 1;
                return;
            }
        });
        if(bottom_flag)
        {
            break;
        }
        list_view.scrollDown();
        sleep(1000);
        list_view = className("android.widget.ListView").depth(11).findOne();
    }
    //log(subscribed_accounts)
    //点击添加
    className("android.widget.TextView").text("添加").findOne().click();
    // 在添加里面逐一扫描每个订阅号是否在上面的已订阅中，如果没匹配到，则订阅这个公众号,订阅num个即可
    let accounts_pool = className("android.widget.ListView").depth(13).findOne();
    var bottom_flag = 0;
    while(accounts_pool!=null&&num>0)
    {
        sleep(1000);
        var frameLayoutList = accounts_pool.children();
        frameLayoutList.forEach(function(item,index){
            if(item.className()=='android.widget.FrameLayout')
            {
                var account_name = item.find(className("android.widget.TextView"));
                //查看数据库中是否已经存在
                let cursor = db.rawQuery("select subscribed from subscribed_tb where subscribed='" + account_name[0].text()+"'", null)
                //如果数据库中没有,则订阅
                if (cursor.getCount() == 0 && num>0) {
                    num--;
                    //subscribed_accounts.push(account_name[0].text());
                    subscribe_icon = item.find(className("android.widget.LinearLayout"))[1];
                    log("subscribe_:"+account_name[0].text())
                    toastLog("正在订阅...");
                    subscribe_icon.click();
                    db.execSQL("insert into subscribed_tb values(null,'"+account_name[0].text() +"')")
                    sleep(1000);
                }
                /* if(num>0&&subscribed_accounts.indexOf(account_name[0].text())==-1)//说明数组中不存在这个元素,则订阅他
                {
                    
                } */
                else if(item.className()=='android.widget.LinearLayout')//遍历到底了
                {
                    bottom_flag = 1;
                    return;
                }
            }
        });
        if(bottom_flag)
        {
            toastLog("强国号都已经订阅完啦...");
            break;
        }
        accounts_pool.scrollDown();
        sleep(1000);
        accounts_pool = className("android.widget.ListView").depth(13).findOne();
    }
    toastLog("订阅任务执行结束！d==(￣▽￣*)b");
    back();//回到 我的订阅
    sleep(1000);
    back();//回到 我的
    sleep(1000);
    back();//回到学习首页
    sleep(1000);
}

